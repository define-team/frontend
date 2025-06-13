import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeviceForm = (state: StateSchema) => state.device?.form;
