import { StateSchema } from '@/app/providers/StoreProvider';

export const getRoleForm = (state: StateSchema) => state.role?.form;