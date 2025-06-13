import { rtkApi } from '@/shared/api/rtkApi';
import { Device, DeviceSchema } from '../model/types/device';

const deviceApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({

        getDeviceData: build.query<DeviceSchema, string>({
            query: () => ({
                url: `/admin/list_devices/`,
                method: 'GET',
            }),
        }),
        deleteDeviceData: build.query<DeviceSchema, string>({
            query: (device_id: string) => ({
                url: `/admin/delete_device/${device_id}/`,
                method: 'DELETE',
            }),
        }),
        createDeviceData: build.query<Device, Device>({
            query: (body) => ({
                url: `/admin/create_device/`,
                method: 'POST',
                body
            }),
        }),
        updateDeviceData: build.query<Device, Device>({
            query: (body) => ({
                url: `/admin/update_device/${body.id}`,
                method: 'PUT',
                body
            }),
        }),
    }),
});

export const getDeviceDataQuery = deviceApi.endpoints.getDeviceData.initiate;
export const deleteDeviceDataQuery = deviceApi.endpoints.deleteDeviceData.initiate;
export const createDeviceDataQuery = deviceApi.endpoints.createDeviceData.initiate;
export const updateDeviceDataQuery = deviceApi.endpoints.updateDeviceData.initiate;