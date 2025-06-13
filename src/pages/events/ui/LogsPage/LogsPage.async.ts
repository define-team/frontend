import { lazy } from 'react';

export const LogsPageAsync = lazy(
    () => import('./LogsPage'),
);
