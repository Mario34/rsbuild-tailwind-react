import { ENUM_ROUTE_PATTERN } from './constant';
import { definePattern } from './core';

export const RoutePatternMap = {
  HOME: definePattern(ENUM_ROUTE_PATTERN.HOME),
  LOGIN: definePattern(ENUM_ROUTE_PATTERN.LOGIN),
};
