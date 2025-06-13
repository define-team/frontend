import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getRoleDataQuery } from '../../api/api';
import { Role } from '../types/role';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initRoleTableData = createAsyncThunk<Role, void, ThunkConfig<string>>(
    'role/initRoleTableData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!adminToken) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getRoleDataQuery(adminToken),
            ).unwrap();
            return response as Role[];
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);