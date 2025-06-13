import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationData = (state: StateSchema) => state.operations?.data;