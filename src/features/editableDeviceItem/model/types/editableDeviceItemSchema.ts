import { Device } from '@/entities/Device';
import { ValidateDeviceError } from '../consts/consts';

export interface EditableDeviceSchema {
    data?: Device;
    form?: Device;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateDeviceError[];
}


export interface DeviceParams {   
    auth_token: string
    ip_address: string
    timeout: number
}