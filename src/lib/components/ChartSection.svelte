<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { onMount } from 'svelte';
	import type { ChartResponse } from '$lib/dto/chart';
	import { WidgetPlaceholder, Card } from 'flowbite-svelte';
	import type { BaseResponse } from '$lib/dto/baseResponse';

	let chartEndpoint = 'http://localhost:8000/predictions/stat';

	let data: ChartResponse;
	let labelPositive: string[];
	let labelNegative: string[];
	let dataLinePositive: {
		labels: string[];
		datasets: any;
	};
	let dataLineNegative: {
		labels: string[];
		datasets: any;
	};

	let datasetPositive: any;
	let datasetNegative: any;

	let total = 0;
	let totalPos = 0;
	let totalNeg = 0;

	onMount(async () => {
		const res = await fetch(chartEndpoint);
		const jsonResponse = (await res.json()) as BaseResponse<ChartResponse>;
		data = jsonResponse.data;
        
		total = data.total;
        totalPos = data.positive
        totalNeg = data.negative
		labelPositive = data.dailyPositive.map((item) => {
			return item.date;
		});

		datasetPositive = [
			{
				label: 'Daily Positive Prediction',
				backgroundColor: 'rgb(37, 207, 46)',
				borderColor: 'rgb(37, 207, 46)',
				borderWidth: 2,
				data: data.dailyPositive.map((item) => {
					return item.count;
				})
			}
		];

		dataLinePositive = {
			labels: labelPositive,
			datasets: datasetPositive
		};

		labelNegative = data.dailyNegative.map((item) => {
			return item.date;
		});

		datasetNegative = [
			{
				label: 'Daily Negative Prediction',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				borderWidth: 2,
				data: data.dailyNegative.map((item) => {
					return item.count;
				})
			}
		];

		dataLineNegative = {
			labels: labelNegative,
			datasets: datasetNegative
		};
	});

	// $: ;
</script>

<div class="py-4">
	<Card size="2xl">
		<p>Total Data</p>
		<h5 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
			{total}
		</h5>
	</Card>
	<div class="grid grid-cols-2 gap-4 py-4">
		<Card size="xl">
			<p>Positif</p>
			<h5 class="mb-2 text-6xl font-bold tracking-tight text-green-pos dark:text-white">
				{totalPos}
			</h5>
		</Card>
		<Card size="xl">
			<p>Negatif</p>
			<h5 class="mb-2 text-6xl font-bold tracking-tight text-red-neg dark:text-white">
				{totalNeg}
			</h5>
		</Card>
	</div>
	<div class="grid grid-cols-2 gap-4">
		{#if dataLinePositive != null}
			<Bar width={700} height={400} data={dataLinePositive} options={{ responsive: false }} />
		{:else}
			<WidgetPlaceholder
				divClass="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-48"
			/>
		{/if}

		{#if dataLineNegative != null}
			<Bar width={700} height={400} data={dataLineNegative} options={{ responsive: false }} />
		{:else}
			<WidgetPlaceholder
				divClass="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-48"
			/>
		{/if}
	</div>
</div>
