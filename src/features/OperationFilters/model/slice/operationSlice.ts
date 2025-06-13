import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditableLogsSchema } from '../types/editableDeviceItemSchema';
import { Operation } from '@/entities/Events';
import { OperationParams } from '@/entities/Events/model/types/operation';
import { initOperationTableData } from '@/entities/Events';

const initialState: EditableLogsSchema = {
  data: [],
  filters: {},
  isLoading: false,
  error: undefined
};

export const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    loadFilters: (state) => {
      state.filters = { ...state.filters, ...JSON.parse(localStorage.getItem('filters')) };
    },
    setFilter: (state, action: PayloadAction<OperationParams>) => {
      state.filters = { ...state.filters, ...action.payload };
      localStorage.setItem('filters', String(state.filters))
    },
    resetFilter: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initOperationTableData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(initOperationTableData.fulfilled, (state, action: PayloadAction<Operation[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(initOperationTableData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { actions: operationActions } = operationSlice;
export const { reducer: operationReducer } = operationSlice;