import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Key } from '@/entities/Key'
import { EditableKeySchema } from '../types/editableKeyItemSchema';
import { updateKeyData } from '../services/updateKey/updateKey';
//import { deleteKeyData } from '../services/deleteKey/deleteKey';

const initialState: EditableKeySchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateDevice: (state, action: PayloadAction<Key>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateKeyData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateKeyData.fulfilled,
                (state, action: PayloadAction<Key>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateKeyData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            })
/*             .addCase(deleteDeviceData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(deleteDeviceData.fulfilled, (state) => {
                state.validateErrors = undefined;
                state.isLoading = false;
            })
            .addCase(deleteDeviceData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            }) */
    },
});

// Action creators are generated for each case reducer function
export const { actions: keyActions } = keySlice;
export const { reducer: keyReducer } = keySlice;
