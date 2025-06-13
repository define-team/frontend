import { StateSchema } from '@/app/providers/StoreProvider';

export const getOperationFilteredData = (state: StateSchema) => state.operations?.filteredData;