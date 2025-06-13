import { lazy } from 'react';

export const RolePageAsync = lazy(
    () => import('./RolePage'),
);
