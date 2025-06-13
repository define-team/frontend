import { UserItem } from '@/entities/Users';
import { ValidateUserError } from '../consts/consts';

export interface EditableUserItemSchema {
    data?: UserItem;
    form?: UserItem;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateUserError[];
}