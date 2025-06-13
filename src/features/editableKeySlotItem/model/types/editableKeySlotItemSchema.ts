import { Key } from '@/entities/Key';
import { ValidateKeySlotError } from '../consts/consts';

export interface EditableKeySlotSchema {
    data?: Key;
    form?: Key;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateKeySlotError[];
}