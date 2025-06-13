import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getDeviceDataQuery } from '../../api/api';
import { DeviceSchema } from '../types/device';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
export const initDeviceTableData = createAsyncThunk<DeviceSchema, void, ThunkConfig<string>>(
    'device/initDeviceTableData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getDeviceDataQuery(adminToken),
            ).unwrap();
            return response as DeviceSchema;
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);