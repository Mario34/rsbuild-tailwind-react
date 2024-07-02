import { createBrowserRouter, Outlet } from 'react-router-dom';
import ErrorBoundary from '@/pages/error';
import { lazy } from 'react';
import { RoutePatternMap } from './pattern';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: RoutePatternMap.HOME.pattern,
        Component: lazy(() => import('@/pages/home')),
      },
    ],
  },
  {
    path: RoutePatternMap.LOGIN.pattern,
    Component: lazy(() => import('@/pages/login')),
  },
]);
