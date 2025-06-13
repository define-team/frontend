import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationError= (state: StateSchema) => state.operations?.error;