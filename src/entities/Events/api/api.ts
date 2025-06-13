import { rtkApi } from '@/shared/api/rtkApi';
import { Operation, OperationParams } from '../model/types/operation';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getLogs: build.query<Operation[], OperationParams>({
            query: (params?) => ({
                url: `/admin/operations`,
                method: 'GET',
                params: params || {}
            }),
        }),
    }),
});

export const getLogsQuery = userApi.endpoints.getLogs.initiate;