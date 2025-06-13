import { StateSchema } from '@/app/providers/StoreProvider';

export const getRoleLoading = (state: StateSchema) => state.role?.isLoading;