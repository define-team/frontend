export enum AppRoutes {
    MAIN = 'main',
    ROLES = 'roles',
    USERS = 'users',
    KEYS = 'keys',
    EVENTS = 'events',
    KEY_SLOTS = 'keyslots',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
    DEVICES = 'devices'
/*     ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    NOT_FOUND = 'not_found', */
}

export const getRouteMain = () => '/';
export const getRouteUsers = () => '/users';
export const getRouteKeys = () => '/keys';
export const getRouteRoles = () => '/roles';
export const getRouteEvents = () => '/events';
export const getRouteKeySlots = () => '/keyslots';
export const getRouteForbidden = () => '/forbidden';
export const getRouteDevices = () => '/devices';

/* export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`; */

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteRoles()]: AppRoutes.ROLES,
    [getRouteUsers()]: AppRoutes.USERS,
    [getRouteKeys()]: AppRoutes.KEYS,
    [getRouteEvents()]: AppRoutes.EVENTS,
    [getRouteKeySlots()]: AppRoutes.KEY_SLOTS,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteDevices()]: AppRoutes.DEVICES,
/*     [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL, */
};