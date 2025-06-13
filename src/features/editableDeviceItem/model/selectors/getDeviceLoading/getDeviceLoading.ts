import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeviceLoading = (state: StateSchema) => state.device?.isLoading;