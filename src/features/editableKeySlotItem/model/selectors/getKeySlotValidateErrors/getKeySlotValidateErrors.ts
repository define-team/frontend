import { StateSchema } from '@/app/providers/StoreProvider';

export const getKeySlotValidateErrors = (state: StateSchema) => state.keySlot?.validateErrors;
