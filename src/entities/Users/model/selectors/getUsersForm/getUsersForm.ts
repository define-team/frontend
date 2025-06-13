import { StateSchema } from '@/app/providers/StoreProvider';

export const getUsersForm = (state: StateSchema) => state.users?.form
