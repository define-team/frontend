import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationLoading = (state: StateSchema) => state.operations?.isLoading;