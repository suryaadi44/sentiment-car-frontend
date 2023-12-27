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

	let totalPosThisWeek: number = 0;
	let totalNegThisWeek: number = 0;
    let totalThisWeek: number = 0;  

	onMount(async () => {
		const res = await fetch(chartEndpoint);
		const jsonResponse = (await res.json()) as BaseResponse<ChartResponse>;
		data = jsonResponse.data;

		total = data.total;
		totalPos = data.positive;
		totalNeg = data.negative;
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

		// sum of negative prediction this week (7 days)
		totalNegThisWeek = data.dailyNegative
			.map((item) => {
				return item.count;
			})
			.reduce((a, b) => a + b, 0);

		// sum of positive prediction this week (7 days)
		totalPosThisWeek = data.dailyPositive
			.map((item) => {
				return item.count;
			})
			.reduce((a, b) => a + b, 0);

        totalThisWeek = totalPosThisWeek + totalNegThisWeek;
	});

	// $: ;
</script>

<div class="py-4">
	<Card size="2xl">
		<h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Prediksi
        </h5>
		<h5 class="text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
			{total}
		</h5>
        <h6 class="text-sm">
            Minggu ini +{totalThisWeek} prediksi
        </h6>
	</Card>
	<div class="grid grid-cols-2 gap-4 py-4">
		<Card size="xl">
            <h5 class="text-xl font-bold">Positif</h5>
			<h5 class="text-6xl font-bold tracking-tight text-green-pos dark:text-white">
				{totalPos}
			</h5>
            <h6 class="text-sm">
                Minggu ini +{totalPosThisWeek} positif
            </h6>
		</Card>
		<Card size="xl">
			<h5 class="text-xl font-bold">Negatif<h5>
			<h4 class=" text-6xl font-bold tracking-tight text-red-neg dark:text-white">
				{totalNeg}
			</h4>
			<p class="text-sm font-medium">
				Minggu ini +{totalNegThisWeek} negatif
			<p>
		</Card>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<Card size="xl">
			{#if dataLinePositive != null}
				<Bar data={dataLinePositive} options={{ responsive: true }} />
			{:else}
				<WidgetPlaceholder
					divClass="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-48"
				/>
			{/if}
		</Card>

		<Card size="xl">
			{#if dataLineNegative != null}
				<Bar data={dataLineNegative} options={{ responsive: true }} />
			{:else}
				<WidgetPlaceholder
					divClass="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 w-48"
				/>
			{/if}
		</Card>
	</div>
</div>
