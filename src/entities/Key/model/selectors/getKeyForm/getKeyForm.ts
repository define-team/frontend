import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeyForm = (state: StateSchema) => state.key?.form
