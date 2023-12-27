<script lang="ts">
	import logo from '$lib/assets/images/favicon.png';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		DarkMode	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
    let path: string;

    let activePage = {
        dashboard: false,
        predict: false,
        history: false,
    }

    // update activePage every change of page
    page.subscribe((value) => {
        path = value.url.pathname
        if (path === '/') {
            activePage.dashboard = true;
            activePage.predict = false;
            activePage.history = false;
        } else if (path === '/predict') {
            activePage.dashboard = false;
            activePage.predict = true;
            activePage.history = false;
        } else if (path === '/history') {
            activePage.dashboard = false;
            activePage.predict = false;
            activePage.history = true;
        }
    });


</script>

<Navbar let:hidden let:toggle navDivClass="mx-auto flex flex-wrap justify-between items-center">
	<NavBrand href="/">
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="Logo Sirkadian" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			SentiPredict
		</span>
	</NavBrand>
	<div class="flex items-center order-2 space-x-3">
		<DarkMode btnClass={darkmodebtn} />
	</div>
	<NavUl
		{hidden}
		ulClass="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:items-center"
	>
		<NavLi href="/" active={activePage.dashboard}>Dashboard</NavLi>
        <NavLi href="/predict" active={activePage.predict}>Prediksi</NavLi>
        <NavLi href="/history" active={activePage.history}>Histori</NavLi>
	</NavUl>
</Navbar>
