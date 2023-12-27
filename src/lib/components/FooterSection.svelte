<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand,
	} from 'flowbite-svelte';
    import logo from '$lib/assets/images/favicon.png';
</script>
<div  class="container mx-auto">
    <Footer footerType="socialmedia">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <FooterBrand
                    href="https://flowbite.com"
                    src={logo}
                    alt="Logo SentiPredict"
                    name="SentiPredict"
                />
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-8 sm:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                        Developer
                    </h2>
                    <FooterLinkGroup>
                        <FooterLink liClass="mb-4" href="https://github.com/suryaadi44">GitHub</FooterLink>
                        <FooterLink liClass="mb-4" href="https://www.facebook.com/suryawarior44">Facebook</FooterLink>
                        <FooterLink liClass="mb-4" href="https://www.instagram.com/surya.adi44/">Instagram</FooterLink>
                    </FooterLinkGroup>
                </div>
            </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="https://www.instagram.com/surya.adi44/" by="Surya Adi" />
        </div>
    </Footer>
</div>
