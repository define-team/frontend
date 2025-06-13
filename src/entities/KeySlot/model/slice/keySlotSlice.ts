import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeySlot } from '../types/keySlot';
import { initKeySlotTableData } from '../services/initKeySlotTableData';

const initialState: KeySlot[] = [{}]

export const keySlotSlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        setKeySlotData: (state, { payload }: PayloadAction<KeySlot>) => {
            state = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initKeySlotTableData.fulfilled,
            (state, { payload }: PayloadAction<KeySlot>) => {
                state = payload;
            },
        );
/*         builder.addCase(initDeviceTableData.rejected, (state) => {
            state._inited = true;
        }); */
    },
});

// Action creators are generated for each case reducer function
export const { actions: keySlotActions } = keySlotSlice;
export const { reducer: keySlotReducer } = keySlotSlice;