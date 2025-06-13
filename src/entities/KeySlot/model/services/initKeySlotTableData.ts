import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getKeySlotDataQuery } from '../../api/api';
import { KeySlot } from '../types/keySlot';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initKeySlotTableData = createAsyncThunk<KeySlot, void, ThunkConfig<string>>(
    'key/initKeyTableData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getKeySlotDataQuery(adminToken),
            ).unwrap();
            return response as KeySlot[];
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);