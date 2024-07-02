import qs from 'qs';
import { generatePath } from 'react-router-dom';

type RouteParam = Record<string, string | number | null | undefined>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteQuery = Record<string, any>;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Q extends RouteQuery | undefined = Record<string, any>,
>(pattern: string) {
  return new RoutePattern<P, Q>({ pattern });
}
