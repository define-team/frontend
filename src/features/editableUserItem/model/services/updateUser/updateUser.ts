import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserItem } from '@/entities/Users';
import { updateUserItemDataQuery } from '@/entities/Users/api/api';

export const updateUserData = createAsyncThunk<
    UserItem,
    UserItem,
    ThunkConfig<string>
>('users/updateUser', async (user_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(updateUserItemDataQuery(user_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});