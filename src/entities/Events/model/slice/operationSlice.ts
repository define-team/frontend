import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operation } from '../types/operation';
import { initOperationTableData } from '../services/initOperationTableData';

const initialState: Operation[] = []

export const operationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {
        setOperationData: (state, { payload }: PayloadAction<Operation>) => {
            state = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initOperationTableData.fulfilled,
            (state, { payload }: PayloadAction<Operation>) => {
                state = payload;
            },
        );
    },
});

export const { actions: operationActions } = operationSlice;
export const { reducer: operationReducer } = operationSlice;