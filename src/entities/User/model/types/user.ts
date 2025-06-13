import { UserRole } from '../consts/userConsts'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { JsonSettings } from './jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

export interface Admin {
    token: string
}

export interface UserSchema {
    authData?: Admin;
    _inited: boolean;
}