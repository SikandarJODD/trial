import type { RequestHandler } from '@sveltejs/kit';
// localhost:5173/api/stripeCheckout
import Stripe from 'stripe';
const SECRECT_STRIPE_KEY =
	'sk_test_51OEFPwSGri3YgWyZNhpWB0ZNW6mqLxKo3PJWgRHrQynmvPnUN2PlUqAqnJ6zk09WQ08ouTyASD2ADsASDFNgpIKG00xf56xmqX';
const stripe = new Stripe(SECRECT_STRIPE_KEY, {
	apiVersion: '2023-10-16'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;
	console.log(items, 'Items');

	let lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});
	console.log(lineItems, 'Line Items');

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});
	console.log(session, 'SESSION');

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
