import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getKeyDataQuery } from '../../api/api';
import { Key } from '../types/key';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initKeyTableData = createAsyncThunk<Key, void, ThunkConfig<string>>(
    'key/initKeyTableData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getKeyDataQuery(adminToken),
            ).unwrap();
            return response as Key[];
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);