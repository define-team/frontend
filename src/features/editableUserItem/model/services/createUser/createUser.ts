import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserItem } from '@/entities/Users';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getUsersForm } from '@/entities/Users/model/selectors/getUsersForm/getUsersForm';
import { createUserItemDataQuery } from '@/entities/Users/api/api';

export const createUserData = createAsyncThunk<UserItem, void, ThunkConfig<string>>(
    'users/createUser',
    async (_, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const formData = getUsersForm(getState());

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!adminToken) {
            return rejectWithValue('');
        }

        if(formData === undefined) {
            throw new Error();
        }

        try {
            const response = dispatch(createUserItemDataQuery(formData))

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