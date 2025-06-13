import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeySlotError = (state: StateSchema) => state.keySlot?.error;