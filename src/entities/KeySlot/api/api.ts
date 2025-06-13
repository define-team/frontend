import { rtkApi } from '@/shared/api/rtkApi';
import { KeySlot } from '../model/types/keySlot';

const keySlotApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({

        getKeySlotData: build.query<KeySlot[], string>({
            query: () => ({
                url: `/admin/slots/`,
                method: 'GET',
            }),
        }),
        deleteKeySlotData: build.query<KeySlot, string>({
            query: (slot_id: string) => ({
                url: `/admin/delete_slot/${slot_id}/`,
                method: 'DELETE',
            }),
        }),
        createKeySlotData: build.query<KeySlot, KeySlot>({
            query: (body) => ({
                url: `/admin/create_slot/`,
                method: 'POST',
                body
            }),
        }),
    }),
});

export const getKeySlotDataQuery = keySlotApi.endpoints.getKeySlotData.initiate;
export const deleteKeySlotDataQuery = keySlotApi.endpoints.deleteKeySlotData.initiate;
export const createKeySlotDataQuery = keySlotApi.endpoints.createKeySlotData.initiate;