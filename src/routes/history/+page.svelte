<script lang="ts">
	import SearchSection from '$lib/components/SearchSection.svelte';

	let hidrateJobs: () => void;
</script>

<div class="container mx-auto my-5">
	<h1 class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
		Sentiment Analysis Dashboard
	</h1>
	<SearchSection />
</div>
