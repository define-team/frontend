import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Role } from '@/entities/Role';
import { deleteRoleDataQuery } from '@/entities/Role/api/api';

export const deleteRoleData = createAsyncThunk<
    Role,
    string,
    ThunkConfig<string>
>('role/deleteRole', async (role_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(deleteRoleDataQuery(role_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});