import { Role } from '@/entities/Role';
import { ValidateRoleError } from '../consts/consts';

export interface EditableRoleSchema {
    data?: Role;
    form?: Role;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateRoleError[];
}