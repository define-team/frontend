import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getLogsQuery } from '../../api/api';
import { Operation, OperationParams } from '../types/operation';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { logsData } from '@/shared/const/tableColumns';

export const initOperationTableData = createAsyncThunk<
  Operation[], 
  OperationParams,
  ThunkConfig<string>
>(
  'operation/initOperationTableData',
  async (params, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const adminToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (!adminToken) {
      return rejectWithValue('No admin token');
    }

    try {
      const response = await dispatch(
        getLogsQuery(params)
      ).unwrap();
      console.log(params)
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue('Error fetching logs');
    }
  }
);