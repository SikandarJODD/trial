import { derived, writable } from 'svelte/store';

export let allproducts = writable([
	{
		id: 'price_1OEGkRSGri3YgWyZ6HGGNz75',
		title: 'Ear Pods',
		pricetag: 3000,
		quantity: 0
	},
	{
		id: 'price_1OEGlgSGri3YgWyZ8ipvZxPp',
		title: 'Headphone',
		pricetag: 5000,
		quantity: 0
	},
	{
		id: 'price_1OEGmUSGri3YgWyZs0Ui9Ruv',
		title: 'College Bag',
		pricetag: 200,
		quantity: 0
	}
]);

export let cartItems = derived(allproducts, ($allproducts) => {
	return $allproducts.filter((n) => n.quantity >= 1);
});
