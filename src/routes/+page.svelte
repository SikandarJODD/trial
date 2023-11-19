<script>
	import { allproducts, cartItems } from '$lib';
	import Product from '$lib/Product.svelte';
	let checkout = async () => {
		console.log($cartItems);
		await fetch('api/stripeCheckout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: $cartItems })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	};
</script>

<div class="mx-auto grid h-screen place-content-center">
	<div class="mx-auto flex flex-wrap justify-center gap-4">
		{#each $allproducts as { title, pricetag, quantity }, i}
			<Product {title} {pricetag} {quantity} {i} />
		{/each}
	</div>
	<div class="mx-auto mt-10">
		<button
			on:click={() => checkout()}
			class="rounded-md border border-emerald-400 bg-green-700/20 p-2.5">Checkout</button
		>
	</div>
</div>
