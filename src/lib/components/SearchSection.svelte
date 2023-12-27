<script lang="ts">
	import { page } from '$app/stores';
	import type { BaseResponse } from '$lib/dto/baseResponse';
	import type { PredictionsResponse } from '$lib/dto/prediction';
	import {
		Input,
		Label,
		Helper,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		Button,
		TableHeadCell,
		Select,
		PaginationItem
	} from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	let searching = false;
	let timeout: any;
	let search: string = '';
	let fetching = false;

	let rawStartDate: string;
	let rawEndDate: string;
	let startDate: Date;
	let endDate: Date;

	let searchEndpoint = 'http://localhost:8000/predictions';

	let predictionsResponse: PredictionsResponse = {
		predictions: [],
		meta: {
			total: 0,
			positive: 0,
			negative: 0
		}
	};

	const limitValues = [
		{ value: 10, name: '10' },
		{ value: 20, name: '20' },
		{ value: 50, name: '50' },
		{ value: 100, name: '100' }
	];

	const pageMeta: {
		activePage: number;
		total: number;
		limit: number;
	} = {
		activePage: 1,
		total: 0,
		limit: 10
	};

	const previous = () => {
		if (pageMeta.activePage > 1) {
			pageMeta.activePage--;
			fetchPredcitions();
		}
	};

	const next = () => {
		if (pageMeta.activePage < Math.ceil(pageMeta.total / pageMeta.limit)) {
			pageMeta.activePage++;
			fetchPredcitions();
		}
	};

	const handlePage = (value: number) => {
		pageMeta.activePage = value;
		fetchPredcitions();
	};

	let pages: { value: number; active?: boolean }[] = [];
	$: {
		const newPages: { value: number; active?: boolean }[] = [];
		for (let i = 1; i <= Math.ceil(pageMeta.total / pageMeta.limit) && i <= 5; i++) {
			newPages.push({
				value: i,
				active: i === pageMeta.activePage
			});
		}
		pages = newPages;
	}

	const fetchPredcitions = async () => {
		fetching = true;
		let urlParam = new URLSearchParams({
			limit: pageMeta.limit.toString(),
			page: pageMeta.activePage.toString(),
			q: search
		});

		if (rawStartDate && rawEndDate) {
			startDate = new Date(rawStartDate);
			endDate = new Date(rawEndDate);

			urlParam.append('start', startDate.toISOString());
			urlParam.append('end', endDate.toISOString());
		}

		const res = await fetch(searchEndpoint + '?' + urlParam.toString());
		const jsonResponse: BaseResponse<PredictionsResponse> = await res.json();

		predictionsResponse = jsonResponse.data;
		pageMeta.total = predictionsResponse.meta.total;
		pageMeta.limit = pageMeta.limit;
		pageMeta.activePage = pageMeta.activePage;

		searching = false;
		fetching = false;
	};

	// fill with blank value up to active limit value

	const handleSearch = () => {
		searching = true;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fetchPredcitions();
		}, 300);
	};
</script>

<div class="py-5">
	<div class="grid grid-cols-1 gap-5">
		<div class="grid grid-cols-1">
			<Label for="search" class="text-gray-700 dark:text-gray-200">Search</Label>
			<Input
				id="search"
				type="text"
				class="mt-1"
				placeholder="Search"
				bind:value={search}
				on:input={handleSearch}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						fetchPredcitions();
					}
				}}
			/>
			<Helper class="text-gray-500 dark:text-gray-400">Cari dari teks sentimen</Helper>
		</div>
	</div>
	<!-- expand width to parent -->
	<div class="grid grid-cols-6 gap-5">
		<div class="col-span-2">
			<Label for="start-date" class="text-gray-700 dark:text-gray-200">Start Date</Label>
			<Input
				id="start-date"
				type="date"
				class="mt-1"
				placeholder="Start Date"
				bind:value={rawStartDate}
			/>
			<Helper class="text-gray-500 dark:text-gray-400">Tanggal awal dari sentimen</Helper>
		</div>
		<div class="col-span-2">
			<Label defaultClass="text-sm font-medium block text-gray-500 dark:text-gray-100">
				End Date
				<Input
					id="end-date"
					type="date"
					class="mt-1"
					placeholder="End Date"
					bind:value={rawEndDate}
				/>
			</Label>
			<Helper class="text-gray-500 dark:text-gray-400">Tanggal akhir dari sentimen</Helper>
		</div>
		<div class="col-span-1">
			<Label defaultClass="text-sm font-medium block text-gray-500 dark:text-gray-100">
				Limit
				<Select
					items={limitValues}
					bind:value={pageMeta.limit}
					on:change={fetchPredcitions}
					class="mt-1"
				/>
			</Label>
		</div>
		<div class="flex items-center justify-center">
			<Button on:click={fetchPredcitions} class="block w-full px-4 py-2 text-gray-900  border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 mt-2">Search</Button>
		</div>
	</div>
</div>
<div>
	<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
		Menampilkan {predictionsResponse.predictions.length} dari {pageMeta.total} data.
		<!-- scroll to table -->
		<a
			href="#table"
			class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
			>Lihat tabel</a
		>
	</p>
</div>
<Table divClass="relative overflow-x-auto">
	<TableHead>
		<TableHeadCell>No</TableHeadCell>
		<TableHeadCell>Waktu</TableHeadCell>
		<TableHeadCell>Data</TableHeadCell>
		<TableHeadCell>Sentimen</TableHeadCell>
	</TableHead>
	{#if fetching}
		<div class="absolute inset-0 bg-gray-500 opacity-50" />
		<div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
			<svg
				aria-hidden="true"
				class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/><path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/></svg
			>
			<span class="sr-only">Loading...</span>
		</div>
	{/if}
	<TableBody>
		<!-- check if null -->
		{#if predictionsResponse.predictions.length === 0}
			<TableBodyRow>
				<TableBodyCell colspan="4">
					<p class="text-center">No Data</p>
				</TableBodyCell>
			</TableBodyRow>
		{:else}
			{#each predictionsResponse.predictions as each, i}
				<TableBodyRow>
					<TableBodyCell>{i + 1}</TableBodyCell>
					<TableBodyCell>{each.time}</TableBodyCell>
					<TableBodyCell>{each.text}</TableBodyCell>
					<!-- <TableBodyCell>{each.predictionStr}</TableBodyCell> -->
                    {#if each.predictionStr === 'Positif'}
                        <TableBodyCell class="text-green-500">{each.predictionStr}</TableBodyCell>
                    {:else if each.predictionStr === 'Negatif'}
                        <TableBodyCell class="text-red-500">{each.predictionStr}</TableBodyCell>
                    {:else}
                        <TableBodyCell class="text-gray-500">{each.predictionStr}</TableBodyCell>
                    {/if}
				</TableBodyRow>
			{/each}
		{/if}
	</TableBody>
</Table>
{#if pageMeta.total > pageMeta.limit}
	<div class="py-4 flex justify-center bg-white dark:bg-gray-800">
		<PaginationItem on:click={previous}>
			<Icon name="chevron-left-outline" class="w-2.5 h-2.5" />
		</PaginationItem>
		{#each pages as { value, active }}
			<PaginationItem
				{active}
				activeClass="bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
				on:click={() => handlePage(value)}
			>
				{value}
			</PaginationItem>
		{/each}
		<PaginationItem on:click={next}>
			<Icon name="chevron-right-outline" class="w-2.5 h-2.5" />
		</PaginationItem>
	</div>
{/if}
