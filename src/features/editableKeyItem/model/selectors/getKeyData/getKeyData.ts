import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeyData = (state: StateSchema) => state.key?.data;