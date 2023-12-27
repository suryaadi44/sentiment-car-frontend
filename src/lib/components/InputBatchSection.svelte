<script lang="ts">
	import type { BaseResponse } from '$lib/dto/baseResponse';
	import { PredictionsResponse, PredictionRequest, PredictionResponse, BatchPredictionResponse } from '$lib/dto/prediction';
	import { batchPredictionFile } from '$lib/response';
	import { Input, Label, Helper, Fileupload, Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import { writable } from 'svelte/store';
	let rawStartDate: string;
	let date: Date;
	let data_single: string;

	let predictBatchEndpoint = 'http://localhost:8000/predictions/batch/file';

	let fileuploadprops = {
		id: 'prediction-file'
	};
	let files: FileList;
	const postPrediction = async () => {
		// post file to endpoint with multipart/form-data
		const formData = new FormData();
		formData.append('file', files[0]);
		const res = await fetch(predictBatchEndpoint, {
			method: 'POST',
			body: formData
		});

		const json: BaseResponse<BatchPredictionResponse> = await res.json();

		batchPredictionFile.set(json.data);
		console.log(json);

		window.location.href = '/result/batch';
	};
</script>

<div class="py-5">
	<!-- expand width to parent -->
	<div class="grid grid-cols-4 gap-5">
		<div class="col-span-3">
			<Label class="pb-2">Upload file</Label>
			<input accept=".csv" bind:files id="prediction-file" name="prediction-file" type="file" />
			<Helper class="text-gray-500 dark:text-gray-400"
				>Upload data dengan header “no, time, data“</Helper
			>
		</div>
		<div class="flex items-center justify-center">
			<Button on:click={postPrediction} class="mt-1">Prediksi</Button>
		</div>
	</div>
</div>
