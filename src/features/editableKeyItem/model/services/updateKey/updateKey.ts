import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Key } from '@/entities/Key';
import { updateKeyDataQuery } from '@/entities/Key/api/api';

export const updateKeyData = createAsyncThunk<
    Key,
    Key,
    ThunkConfig<string>
>('key/updateKey', async (device_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(updateKeyDataQuery(device_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});