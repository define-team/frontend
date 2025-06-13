import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeySlot } from '@/entities/KeySlot'
import { EditableKeySlotSchema } from '../types/editableKeySlotItemSchema';
import { createKeySlotData } from '../services/createKeySlot/createKeySlot';

const initialState: EditableKeySlotSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const keySlotSlice = createSlice({
    name: 'keySlot',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.validateErrors = undefined;
            state.form = state.data;
        },
        createKeySlot: (state, action: PayloadAction<KeySlot>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createKeySlotData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                createKeySlotData.fulfilled,
                (state, action: PayloadAction<KeySlot>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.validateErrors = undefined;
                },
            )
            .addCase(createKeySlotData.rejected, (state, action) => {
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
export const { actions: keySlotActions } = keySlotSlice;
export const { reducer: keySlotReducer } = keySlotSlice;
