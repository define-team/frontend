export interface Operation {
    device_id?: string,
    id?: number,
    key_number?: string,
    timestamp?: string,
    type?: string,
    user_id?: string
}

export interface OperationParams {
    user_id?: string;
    key_number?: number;
    device_id?: number;
}