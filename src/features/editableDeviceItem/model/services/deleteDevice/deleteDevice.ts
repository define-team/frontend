import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Device } from '@/entities/Device';
import { deleteDeviceDataQuery } from '@/entities/Device/api/api';

export const deleteDeviceData = createAsyncThunk<
    Device,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (device_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(deleteDeviceDataQuery(device_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});