import { StateSchema } from '@/app/providers/StoreProvider';

export const getRoleValidateErrors = (state: StateSchema) => state.role?.validateErrors;
