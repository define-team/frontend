import { rtkApi } from '@/shared/api/rtkApi';
import { Role } from '../model/types/role';

const roleApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({

        getRoleData: build.query<Role[], string>({
            query: () => ({
                url: `/admin/roles/`,
                method: 'GET',
            }),
        }),
        deleteRoleData: build.query<Role, string>({
            query: (role_id: string) => ({
                url: `/admin/roles/${role_id}/`,
                method: 'DELETE',
            }),
        }),
        createRoleData: build.query<Role, Role>({
            query: (body) => ({
                url: `/admin/roles/`,
                method: 'POST',
                body
            }),
        }),
        updateRoleData: build.query<Role, Role>({
            query: (body) => ({
                url: `/admin/roles/${body.id}`,
                method: 'PUT',
                body
            }),
        }),
    }),
});

export const getRoleDataQuery = roleApi.endpoints.getRoleData.initiate;
export const deleteRoleDataQuery = roleApi.endpoints.deleteRoleData.initiate;
export const createRoleDataQuery = roleApi.endpoints.createRoleData.initiate;
export const updateRoleDataQuery = roleApi.endpoints.updateRoleData.initiate;