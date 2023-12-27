<script lang="ts">
	import type { BaseResponse } from '$lib/dto/baseResponse';
	import { BatchPredictionResponse } from '$lib/dto/prediction';
	import { batchPredictionFile } from '$lib/response';
	import { Label, Helper, Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	let predictBatchEndpoint = 'http://localhost:8000/predictions/batch/file';

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
	<div>
		<!-- <div class="col-span-3">
			<Label class="pb-2">Upload file</Label>
			<input accept=".csv" bind:files id="prediction-file" name="prediction-file" type="file" />
			<Helper class="text-gray-500 dark:text-gray-400"
            >Upload data dengan header “no, time, data“</Helper
			>
		</div> -->

		<div class="">
			<Label class="pb-2">Upload file</Label>
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					{#if files == null}
						<svg
							class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">
							CSV file with header “no, time, data“
						</p>
                    {:else}
                        {files[0].name}
					{/if}
				</div>
				<input id="dropzone-file" type="file" class="hidden" bind:files />
			</label>
			<Helper class="text-gray-500 dark:text-gray-400"
				>Upload data dengan header “no, time, data“</Helper
			>
		</div>

		<div class="flex items-center justify-center">
			<Button
				on:click={postPrediction}
				class="block w-full px-4 py-2 text-gray-900  border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 mt-2"
				>Prediksi</Button
			>
		</div>
	</div>
</div>
