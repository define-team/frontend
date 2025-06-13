import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserItem } from '@/entities/Users';
import { EditableUserItemSchema } from '../types/editableKeyItemSchema';
import { updateUserData } from '../services/updateUser/updateUser';
//import { deleteKeyData } from '../services/deleteKey/deleteKey';

const initialState: EditableUserItemSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateUserItem: (state, action: PayloadAction<UserItem>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateUserData.fulfilled,
                (state, action: PayloadAction<UserItem>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateUserData.rejected, (state, action) => {
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
export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
