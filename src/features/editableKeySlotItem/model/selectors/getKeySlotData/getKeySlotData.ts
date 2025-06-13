import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeySlotData = (state: StateSchema) => state.keySlot?.data;