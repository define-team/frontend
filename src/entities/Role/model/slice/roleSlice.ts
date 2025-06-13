import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../types/role';
import { initRoleTableData } from '../services/initRoleTableData';
import { EditableRoleSchema } from '@/features/editableRoleItem/model/types/editableRoleItemSchema';

const initialState: Role[] = [{}]

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRoleData: (state, { payload }: PayloadAction<Role>) => {
            state = payload;
        },
        updateRole: (state, action: PayloadAction<EditableRoleSchema>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initRoleTableData.fulfilled,
            (state, { payload }: PayloadAction<Role>) => {
                state = payload;
            },
        );
/*         builder.addCase(initDeviceTableData.rejected, (state) => {
            state._inited = true;
        }); */
    },
});

// Action creators are generated for each case reducer function
export const { actions: roleActions } = roleSlice;
export const { reducer: roleReducer } = roleSlice;