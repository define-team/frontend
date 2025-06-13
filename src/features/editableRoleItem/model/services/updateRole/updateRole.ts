import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Role } from '@/entities/Role';
import { updateRoleDataQuery } from '@/entities/Role/api/api';

export const updateRoleData = createAsyncThunk<
    Role,
    Role,
    ThunkConfig<string>
>('key/updateKey', async (role_id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(updateRoleDataQuery(role_id))

        if (!response) {
            throw new Error();
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});