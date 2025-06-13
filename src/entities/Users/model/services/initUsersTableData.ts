import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserItemDataQuery } from '../../api/api';
import { UserItem } from '../types/userItem';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initUsersTableData = createAsyncThunk<UserItem, void, ThunkConfig<string>>(
    'users/initUsersTableData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getUserItemDataQuery(adminToken),
            ).unwrap();
            return response as UserItem[];
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);