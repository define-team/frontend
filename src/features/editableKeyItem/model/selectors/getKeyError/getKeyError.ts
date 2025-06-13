import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeyError = (state: StateSchema) => state.key?.error;