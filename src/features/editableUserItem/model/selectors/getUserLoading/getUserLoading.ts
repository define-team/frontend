import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserLoading = (state: StateSchema) => state.users?.isLoading;