import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeviceData = (state: StateSchema) => state.device?.data;