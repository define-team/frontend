import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceSchema } from '../types/device';
import { initDeviceTableData } from '../services/initDeviceTableData';
import { EditableDeviceSchema } from '@/features/editableDeviceItem/model/types/editableDeviceItemSchema';

const initialState: DeviceSchema = {
    devices: []
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDeviceData: (state, { payload }: PayloadAction<DeviceSchema>) => {
            state.devices = payload.devices;
        },
        updateDevice: (state, action: PayloadAction<EditableDeviceSchema>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
/*         setNewDevice: (state, { payload }: PayloadAction<Device>) => {
            state.deviceData?.push(payload)
        },
        deleteDevice: (state, { payload }: PayloadAction<Device>) => {
            state.deviceData?.(payload)
        },
        putDevice: (state, { payload }: PayloadAction<Device>) => {
            state.deviceData?.push(payload)
        }, */
/*         logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }, */
    },
    extraReducers: (builder) => {
        builder.addCase(
            initDeviceTableData.fulfilled,
            (state, { payload }: PayloadAction<DeviceSchema>) => {
                state.devices = payload.devices;
            },
        );
/*         builder.addCase(initDeviceTableData.rejected, (state) => {
            state._inited = true;
        }); */
    },
});

// Action creators are generated for each case reducer function
export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;