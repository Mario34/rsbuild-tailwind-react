import qs from "qs";
import { generatePath } from "react-router-dom";

type RouteParam = Record<string, string | number | null | undefined>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type RouteQuery = Record<string, any>;

const a = 2;

class RoutePattern<
	P extends RouteParam | undefined = undefined,
	Q extends RouteQuery | undefined = undefined,
> {
	constructor({ pattern }: { pattern: string }) {
		this.pattern = pattern;
	}

	public pattern: string;

	private params: RouteParam = {};

	private query: RouteQuery = {};

	private parse(params: RouteParam, query?: RouteQuery) {
		let path = generatePath(this.pattern, params);
		const queryStr = qs.stringify(query).toString();
		if (queryStr) {
			path = `${path}?${queryStr}`;
		}
		return path;
	}

	/**
	 * 添加params
	 */
	p(params: P) {
		this.params = params ?? {};
		return this;
	}

	/**
	 * 添加query
	 */
	q(query: Q) {
		this.query = query ?? {};
		return this;
	}

	v() {
		const path = this.parse(this.params, this.query);
		this.params = {};
		this.query = {};
		return path;
	}

	path({ params, query }: { params?: P; query?: Q } = {}) {
		return this.parse(params ?? {}, query);
	}
}

export function definePattern<
	P extends RouteParam | undefined = undefined,
	Q extends RouteQuery | undefined = Record<string, unknown>,
>(pattern: string) {
	return new RoutePattern<P, Q>({ pattern });
}
