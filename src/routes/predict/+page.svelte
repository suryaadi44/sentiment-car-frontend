<script lang="ts">
	import InputSingleSection from '$lib/components/InputSingleSection.svelte';
    import InputBatchSection from '$lib/components/InputBatchSection.svelte';
</script>

<div class="container mx-auto my-5">
	<h1 class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
		Prediksi Single Data
	</h1>

	<InputSingleSection />
    <hr>

    <h1 class="pt-5 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
		Prediksi Batch Data
	</h1>

    <InputBatchSection/>
</div>
