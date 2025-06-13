import { Operation } from "@/entities/Events";
import { ValidateDeviceError } from '../consts/consts';
import { OperationParams } from "@/entities/Events/model/types/operation";

export interface EditableLogsSchema {
    data?: Operation[],
    filteredData?: Operation[],
    filters?: OperationParams,
    isLoading?: boolean,
    error?: string
    validateErrors?: ValidateDeviceError[];
}
