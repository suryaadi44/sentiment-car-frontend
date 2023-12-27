<script>
	import FooterSection from '$lib/components/FooterSection.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import '../app.css';
</script>

<NavigationBar />
<slot />
<FooterSection />
