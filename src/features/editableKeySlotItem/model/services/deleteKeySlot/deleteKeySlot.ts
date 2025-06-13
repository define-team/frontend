import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { KeySlot } from '@/entities/KeySlot';
import { deleteKeySlotDataQuery } from '@/entities/KeySlot/api/api';

export const deleteKeySlotData = createAsyncThunk<
    KeySlot,
    string,
    ThunkConfig<string>
>('keySlot/deleteKeySlot', async (keySlot_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(deleteKeySlotDataQuery(keySlot_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});