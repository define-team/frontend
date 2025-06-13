import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/entities/Role'
import { EditableRoleSchema } from '../types/editableRoleItemSchema';
import { updateRoleData } from '../services/updateRole/updateRole';
//import { deleteKeyData } from '../services/deleteKey/deleteKey';

const initialState: EditableRoleSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateRole: (state, action: PayloadAction<Role>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateRoleData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateRoleData.fulfilled,
                (state, action: PayloadAction<Role>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateRoleData.rejected, (state, action) => {
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
export const { actions: roleActions } = roleSlice;
export const { reducer: roleReducer } = roleSlice;
