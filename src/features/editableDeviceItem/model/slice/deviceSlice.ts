import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '@/entities/Device'
import { updateDeviceData } from '../services/updateDevice/updateDevice';
import { EditableDeviceSchema } from '../types/editableDeviceItemSchema';
import { deleteDeviceData } from '../services/deleteDevice/deleteDevice';

const initialState: EditableDeviceSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateDevice: (state, action: PayloadAction<Device>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateDeviceData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateDeviceData.fulfilled,
                (state, action: PayloadAction<Device>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateDeviceData.rejected, (state, action) => {
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
export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
