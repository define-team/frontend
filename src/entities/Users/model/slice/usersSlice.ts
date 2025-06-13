import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserItem } from '../types/userItem';
import { initUsersTableData } from '../services/initUsersTableData';
import { EditableKeySchema } from '@/features/editableKeyItem/model/types/editableKeyItemSchema';

const initialState: UserItem[] = [{}]

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setDeviceData: (state, { payload }: PayloadAction<UserItem>) => {
            state = payload;
        },
        updateDevice: (state, action: PayloadAction<EditableUserItemSchema>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initUsersTableData.fulfilled,
            (state, { payload }: PayloadAction<UserItem>) => {
                state = payload;
            },
        );
/*         builder.addCase(initDeviceTableData.rejected, (state) => {
            state._inited = true;
        }); */
    },
});

// Action creators are generated for each case reducer function
export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;