import { rtkApi } from '@/shared/api/rtkApi';
import { UserItem } from '../model/types/userItem';

const userItemApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({

        getUserItemData: build.query<UserItem[], string>({
            query: () => ({
                url: `/admin/users/`,
                method: 'GET',
            }),
        }),
        deleteUserItemData: build.query<UserItem , string>({
            query: (user_id: string) => ({
                url: `/admin/delete_user/${user_id}/`,
                method: 'DELETE',
            }),
        }),
        createUserItemData: build.query<UserItem , UserItem >({
            query: (body) => ({
                url: `/admin/create_user/`,
                method: 'POST',
                body
            }),
        }),
        updateUserItemData: build.query<UserItem , UserItem >({
            query: (body) => ({
                url: `/admin/update_user/${body.id}`,
                method: 'PUT',
                body
            }),
        }),
    }),
});

export const getUserItemDataQuery = userItemApi.endpoints.getUserItemData.initiate;
export const deleteUserItemDataQuery = userItemApi.endpoints.deleteUserItemData.initiate;
export const createUserItemDataQuery = userItemApi.endpoints.createUserItemData.initiate;
export const updateUserItemDataQuery = userItemApi.endpoints.updateUserItemData.initiate;