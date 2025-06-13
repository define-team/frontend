import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeyValidateErrors = (state: StateSchema) => state.key?.validateErrors;
