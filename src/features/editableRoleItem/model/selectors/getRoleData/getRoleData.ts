import { StateSchema } from '@/app/providers/StoreProvider';

export const getRoleData = (state: StateSchema) => state.role?.data;