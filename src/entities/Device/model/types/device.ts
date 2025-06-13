export interface Device {
    auth_token?: string,
    created_at?: string,
    id?: string,
    ip_address?: string,
    timeout?: number,
    updated_at?: string
}

export interface DeviceSchema {
    devices?: Device[] | [];
}