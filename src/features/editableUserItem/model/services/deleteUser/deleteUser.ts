import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserItem } from '@/entities/Users';
import { deleteUserItemDataQuery } from '@/entities/Users/api/api';

export const deleteUserData = createAsyncThunk<
    UserItem,
    string,
    ThunkConfig<string>
>('key/deleteKey', async (user_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(deleteUserItemDataQuery(user_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});