import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserForm = (state: StateSchema) => state.users?.form;