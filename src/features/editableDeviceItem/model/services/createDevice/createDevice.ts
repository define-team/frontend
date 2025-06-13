import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Device } from '../../../../../entities/Device/model/types/device';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getDeviceForm } from '../../../../../entities/Device/model/selectors/getDeviceForm/getDeviceForm';
import { createDeviceDataQuery } from '@/entities/Device/api/api';

export const createDeviceData = createAsyncThunk<Device, void, ThunkConfig<string>>(
    'device/updateDevice',
    async (_, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const formData = getDeviceForm(getState());

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = dispatch(createDeviceDataQuery(formData))

            if (!response) {
                throw new Error();
            }

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);