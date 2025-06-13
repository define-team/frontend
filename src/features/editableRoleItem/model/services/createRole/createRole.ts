import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Role } from '@/entities/Role';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getRoleForm } from '@/entities/Role/model/selectors/getRoleForm/getRoleForm';
import { createRoleDataQuery } from '@/entities/Role/api/api';

export const createRoleData = createAsyncThunk<Role, void, ThunkConfig<string>>(
    'role/createRole',
    async (_, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const formData = getRoleForm(getState());

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!adminToken) {
            return rejectWithValue('');
        }

        if(formData === undefined) {
            throw new Error();
        }

        try {
            const response = dispatch(createRoleDataQuery(formData))

            if (!response) {
                throw new Error();
            }

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);