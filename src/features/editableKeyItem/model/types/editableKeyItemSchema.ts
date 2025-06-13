import { Key } from '@/entities/Key';
import { ValidateKeyError } from '../consts/consts';

export interface EditableKeySchema {
    data?: Key;
    form?: Key;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateKeyError[];
}