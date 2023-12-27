<script lang="ts">
	import type { PredictionResponse } from '$lib/dto/prediction';
	import { singlePrediction } from '$lib/response';
	import { onMount } from 'svelte';
	import { Pie } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { Card, Label, Textarea, Input } from 'flowbite-svelte';

	let currentPrediction: PredictionResponse = {
		prediction: 0,
		predictionStr: '',
		score: [1, 0],
		text: '',
		time: '',
		batchId: ''
	};
	let dataChart: {
		labels: string[];
		datasets: any;
	};
	let ready = false;
	let textareaprops: any;

	singlePrediction.subscribe((data) => {
		currentPrediction = data;
		console.log(currentPrediction);
		ready = true;
	});

	onMount(() => {
		let dataset = {
			data: currentPrediction.score,
			backgroundColor: ['rgb(255, 0, 0)', 'rgb(37, 207, 46)']
		};

		textareaprops = {
			id: 'text',
			name: 'text',
			label: 'Text',
			placeholder: currentPrediction.text,
			disabled: true
		};

		dataChart = {
			labels: ['Negative', 'Positive'],
			datasets: [dataset]
		};
	});
</script>

<!-- if ready -->
<div class="py-4">
	<div class="grid grid-cols-2 gap-5">
		{#if dataChart != null}
			<Pie
				width={500}
				height={500}
				data={dataChart}
				options={{
					responsive: false
				}}
			/>
		{/if}
		<div>
			{#if currentPrediction != null}
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Sentimen {currentPrediction.predictionStr}
				</h5>
				<Label class="block mb-2">Data</Label>
				<Textarea {...textareaprops} />
				<Label class="block mb-2">Waktu</Label>
				<Input id="time" name="time" placeholder={currentPrediction.time} disabled={true} />
				<Label class="block mb-2">Sentimen</Label>
				<Input
					id="sentiment"
					name="sentiment"
					placeholder={currentPrediction.predictionStr}
					disabled={true}
				/>
			{/if}
		</div>
	</div>
</div>
