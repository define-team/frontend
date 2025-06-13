import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeviceValidateErrors = (state: StateSchema) =>
    state.device?.validateErrors;
