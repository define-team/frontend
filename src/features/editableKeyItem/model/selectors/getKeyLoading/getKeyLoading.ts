import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeyLoading = (state: StateSchema) => state.key?.isLoading;