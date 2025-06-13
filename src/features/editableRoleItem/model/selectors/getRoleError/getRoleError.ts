import { StateSchema } from '@/app/providers/StoreProvider';

export const getRoleError = (state: StateSchema) => state.role?.error;