import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeySlotLoading = (state: StateSchema) => state.keySlot?.isLoading;