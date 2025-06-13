import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { KeySlot } from '@/entities/KeySlot';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getKeySlotForm } from '@/entities/KeySlot/model/selectors/getKeySlotForm/getKeySlotForm';
import { createKeySlotDataQuery } from '@/entities/KeySlot/api/api';

export const createKeySlotData = createAsyncThunk<KeySlot, void, ThunkConfig<string>>(
    'key/createKey',
    async (_, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const formData = getKeySlotForm(getState());

        const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!adminToken) {
            return rejectWithValue('');
        }

        if(formData === undefined) {
            throw new Error();
        }

        try {
            const response = dispatch(createKeySlotDataQuery(formData))

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