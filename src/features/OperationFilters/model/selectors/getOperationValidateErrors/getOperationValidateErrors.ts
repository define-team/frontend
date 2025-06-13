import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationValidateErrors = (state: StateSchema) =>
    state.operations?.validateErrors;
