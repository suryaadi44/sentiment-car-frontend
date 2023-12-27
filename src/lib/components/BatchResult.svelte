<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { BatchPredictionResponse } from '$lib/dto/prediction';
	import { batchPredictionFile } from '$lib/response';
	import { onMount } from 'svelte';
	import { Pie } from 'svelte-chartjs';
	import 'chart.js/auto';
	import {
		Label,
		Input,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';

	let currentPrediction: BatchPredictionResponse = {
		filename: '',
		predictions: [],
		timestamp: '',
		meta: {
			total: 0,
			positive: 0,
			negative: 0
		}
	};

	let dataChart: {
		labels: string[];
		datasets: any;
	};

	batchPredictionFile.subscribe((data) => {
		currentPrediction = data;
		console.log(currentPrediction);
	});
	onMount(() => {
		let dataset = {
			data: [currentPrediction.meta.negative, currentPrediction.meta.positive],
			backgroundColor: ['rgb(255, 0, 0)', 'rgb(37, 207, 46)']
		};

		dataChart = {
			labels: ['Negative', 'Positive'],
			datasets: [dataset]
		};
	});
</script>

<!-- if ready -->

<div class="py-4 justify-center">
	<div class="mb-2">
		<Card size="2xl">
			<div class="grid grid-cols-3 gap-5 mb-3">
				<div>
					{#if dataChart != null}
						<Pie
							data={dataChart}
							options={{
								responsive: true
							}}
						/>
					{/if}
				</div>
				<div class="flex items-center col-span-2">
					<div class="grow">
						{#if currentPrediction != null}
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								File
							</h5>
							<Label class="block mt-2">Filename</Label>
							<Input
								id="filename"
								name="filename"
								defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-100 rtl:text-right"
								placeholder={currentPrediction.filename}
								disabled={true}
							/>
							<Label class="block mt-2">Dibuat</Label>
							<Input
								id="time"
								name="time"
								defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-100 rtl:text-right"
								placeholder={currentPrediction.timestamp}
								disabled={true}
							/>
							<Label class="block mt-2">Sentimen</Label>
							<div class="grid grid-cols-2 gap-2">
								<div>
									<Label class="block mt-2">Positif</Label>
									<Input
										id="positive"
										name="positive"
										defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-100 rtl:text-right"
										placeholder={currentPrediction.meta.positive}
										disabled={true}
									/>
								</div>
								<div>
									<Label class="block mt-2">Negatif</Label>
									<Input
										id="negative"
										name="negative"
										defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-100 rtl:text-right"
										placeholder={currentPrediction.meta.negative}
										disabled={true}
									/>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</Card>
	</div>
	<Table divClass="relative overflow-x-auto">
		<TableHead>
			<TableHeadCell>No</TableHeadCell>
			<TableHeadCell>Waktu</TableHeadCell>
			<TableHeadCell>Data</TableHeadCell>
			<TableHeadCell>Sentimen</TableHeadCell>
		</TableHead>
		<TableBody>
			<!-- check if null -->
			{#if currentPrediction == null}
				<TableBodyRow>
					<TableBodyCell colspan="4">
						<p class="text-center">No Data</p>
					</TableBodyCell>
				</TableBodyRow>
			{:else}
				{#each currentPrediction.predictions as each, i}
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
</div>
