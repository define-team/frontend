import { lazy } from 'react';

export const DevicesPageAsync = lazy(
    () => import('./DevicePage'),
);
