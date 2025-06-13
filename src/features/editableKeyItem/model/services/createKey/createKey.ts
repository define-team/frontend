import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Key } from '../../../../../entities/Key/model/types/key';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getKeyForm } from '@/entities/Key/model/selectors/getKeyForm/getKeyForm';
import { createKeyDataQuery } from '@/entities/Key/api/api';

export const createKeyData = createAsyncThunk<Key, void, ThunkConfig<string>>(
    'key/createKey',
    async (_, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const formData = getKeyForm(getState());

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!adminToken) {
            return rejectWithValue('');
        }

        if(formData === undefined) {
            throw new Error();
        }

        try {
            const response = dispatch(createKeyDataQuery(formData))

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