import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Key } from '../types/key';
import { initKeyTableData } from '../services/initKeyTableData';
import { EditableKeySchema } from '@/features/editableKeyItem/model/types/editableKeyItemSchema';

const initialState: Key[] = [{}]

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        setDeviceData: (state, { payload }: PayloadAction<Key>) => {
            state = payload;
        },
        updateDevice: (state, action: PayloadAction<EditableKeySchema>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initKeyTableData.fulfilled,
            (state, { payload }: PayloadAction<Key>) => {
                state = payload;
            },
        );
/*         builder.addCase(initDeviceTableData.rejected, (state) => {
            state._inited = true;
        }); */
    },
});

// Action creators are generated for each case reducer function
export const { actions: keyActions } = keySlice;
export const { reducer: keyReducer } = keySlice;