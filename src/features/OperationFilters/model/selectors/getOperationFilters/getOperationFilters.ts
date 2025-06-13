import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationFilters = (state: StateSchema) => state.operations?.filters;