import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeviceError = (state: StateSchema) => state.device?.error;