import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = await next();
	const html = await response.text();
	console.log("html", html);
	return new Response(html, {
		status: 200,
		headers: response.headers,
	});
};
