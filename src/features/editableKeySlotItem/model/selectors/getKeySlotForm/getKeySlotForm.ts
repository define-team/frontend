import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeySlotForm = (state: StateSchema) => state.keySlot?.form;