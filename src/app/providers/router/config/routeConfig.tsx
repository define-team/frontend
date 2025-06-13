import {
    AppRoutes,
    getRouteForbidden,
    getRouteMain,
    getRouteUsers,
    getRouteEvents,
    getRouteKeys,
    getRouteDevices,
    getRouteKeySlots,
    getRouteRoles,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import LayoutPage from '@/pages/layout';
import NotFound from '@/pages/not-found';
import Forbidden from '@/pages/Forbidden';
import { DevicePage } from '@/pages/Devices';
import { KeyPage } from '@/pages/Keys';
import { KeySlotsPageAsync } from '@/pages/KeySlots/ui/KeySlotsPage/KeySlotsPage.async';
import { UsersPageAsync } from '@/pages/Users/ui/UsersPage/UsersPage.async';
import { RolePageAsync } from '@/pages/Roles/ui/RolesPage/RolePage.async';
import { LogsPageAsync } from '@/pages/events/ui/LogsPage/LogsPage.async';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <LayoutPage />,
        authOnly: true,
    },
    [AppRoutes.ROLES]: {
        path: getRouteRoles(),
        element: <RolePageAsync />,
        authOnly: true,
    },
    [AppRoutes.USERS]: {
        path: getRouteUsers(),
        element: <UsersPageAsync />,
        authOnly: true,
    },
    [AppRoutes.KEYS]: {
        path: getRouteKeys(),
        element: <KeyPage />,
        authOnly: true,
    },
    [AppRoutes.EVENTS]: {
        path: getRouteEvents(),
        element: <LogsPageAsync />,
        authOnly: true,
    },
    [AppRoutes.DEVICES]: {
        path: getRouteDevices(),
        element: <DevicePage />,
        authOnly: true,
    },
    [AppRoutes.KEY_SLOTS]: {
        path: getRouteKeySlots(),
        element: <KeySlotsPageAsync />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <Forbidden />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFound />,
    },
};
