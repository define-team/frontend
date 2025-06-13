import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Key } from '@/entities/Key';
import { deleteKeyDataQuery } from '@/entities/Key/api/api';

export const deleteKeyData = createAsyncThunk<
    Key,
    string,
    ThunkConfig<string>
>('key/deleteKey', async (device_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(deleteKeyDataQuery(device_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});