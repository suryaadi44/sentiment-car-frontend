<script lang="ts">
	import type { BaseResponse } from '$lib/dto/baseResponse';
	import type { PredictionRequest, PredictionResponse } from '$lib/dto/prediction';
	import { Input, Label, Helper, Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import { writable } from 'svelte/store';
	import { singlePrediction } from '$lib/response';
	import { onMount } from 'svelte';

	let rawStartDate: string;
	let date: Date;
	let data_single: string;

	let predictSingleEndpoint = 'http://localhost:8000/predictions';

    onMount(() => {
        singlePrediction.subscribe((data) => {
            console.log(data);
        });
    });

	const postPrediction = async () => {
		date = new Date(rawStartDate);
		const data: PredictionRequest = {
			text: data_single,
			time: date.toISOString()
		};

		const res = await fetch(predictSingleEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const json: BaseResponse<PredictionResponse> = await res.json();

		singlePrediction.set(json.data);    
        window.location.href = '/result';    
	};
</script>

<div class="py-5">
	<div class="grid grid-cols-1 gap-5">
		<div class="grid grid-cols-1">
			<Label for="data-single" class="text-gray-700 dark:text-gray-200">Data</Label>
			<Input
				id="data-single"
				type="text"
				class="mt-1"
				placeholder="data"
				bind:value={data_single}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						postPrediction();
					}
				}}
			/>
			<Helper class="text-gray-500 dark:text-gray-400"
				>Tambahkan sebuah data untuk dianalisis</Helper
			>
		</div>
	</div>
	<!-- expand width to parent -->
	<div class="grid grid-cols-4 gap-5">
		<div class="col-span-3">
			<Label for="start-date" class="text-gray-700 dark:text-gray-200">Waktu</Label>
			<Input
				id="start-date"
				type="date"
				class="mt-1"
				placeholder="Start Date"
				bind:value={rawStartDate}
			/>
			<Helper class="text-gray-500 dark:text-gray-400">Waktu Data</Helper>
		</div>
		<div class="flex items-center justify-center">
			<Button on:click={postPrediction} class="mt-1">Prediksi</Button>
		</div>
	</div>
</div>
