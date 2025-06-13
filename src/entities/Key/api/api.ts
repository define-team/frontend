import { rtkApi } from '@/shared/api/rtkApi';
import { Key } from '../model/types/key';

const keyApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({

        getKeyData: build.query<Key[], string>({
            query: () => ({
                url: `/admin/keys/`,
                method: 'GET',
            }),
        }),
        deleteKeyData: build.query<Key, string>({
            query: (key_id: string) => ({
                url: `/admin/delete_key/${key_id}/`,
                method: 'DELETE',
            }),
        }),
        createKeyData: build.query<Key, Key>({
            query: (body) => ({
                url: `/admin/create_key/`,
                method: 'POST',
                body
            }),
        }),
        updateKeyData: build.query<Key, Key>({
            query: (body) => ({
                url: `/admin/update_key/${body.id}`,
                method: 'PUT',
                body
            }),
        }),
    }),
});

export const getKeyDataQuery = keyApi.endpoints.getKeyData.initiate;
export const deleteKeyDataQuery = keyApi.endpoints.deleteKeyData.initiate;
export const createKeyDataQuery = keyApi.endpoints.createKeyData.initiate;
export const updateKeyDataQuery = keyApi.endpoints.updateKeyData.initiate;