import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import type { RouteId, RouteIdWithSearchOrHash } from '$app/types';

/** Build a query string from the current URL, immutably */
export function query(url: URL) {
	const sp = new URLSearchParams(url.searchParams);

	function routeHref() {
		const search = sp.toString();
		const query = search ? `?${search}` : '';
		return `${url.pathname}${query}` as RouteIdWithSearchOrHash;
	}

	const api = {
		set(key: string, value: string | number | null) {
			if (value === null || value === '') sp.delete(key);
			else sp.set(key, String(value));
			return api;
		},
		toggle(key: string, value: string) {
			if (sp.get(key) === value) sp.delete(key);
			else sp.set(key, value);
			return api;
		},
		has(key: string, value?: string) {
			return value === undefined ? sp.has(key) : sp.get(key) === value;
		},
		toString() {
			const s = sp.toString();
			return s ? `?${s}` : '?';
		},
		/** Resolved href for <a> tags on the current path */
		href() {
			return resolve(routeHref());
		},
		/** Navigate to the built query string on the current path */
		go(opts?: Parameters<typeof goto>[1]) {
			return goto(resolve(routeHref()), { keepFocus: true, noScroll: true, ...opts });
		}
	};
	return api;
}

/** Programmatic navigation choke point */
export function navto(path: RouteId, opts?: Parameters<typeof goto>[1]) {
	return goto(resolve(path), { keepFocus: true, noScroll: true, ...opts });
}
