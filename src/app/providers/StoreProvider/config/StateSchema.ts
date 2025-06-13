/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    UnknownAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { LoginSchema } from '@/features/AuthByUsername';
import { UserSchema } from '@/entities/User';
import { ArticleDetailsSchema } from '@/entities/Article';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { UISchema } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { ProfileSchema } from '@/features/editableProfileCard';
import { EditableDeviceSchema } from '@/features/editableDeviceItem/model/types/editableDeviceItemSchema';
import { EditableKeySchema } from '@/features/editableKeyItem/model/types/editableKeyItemSchema';
import { EditableKeySlotSchema } from '@/features/editableKeySlotItem/model/types/editableKeySlotItemSchema';
import { EditableUserItemSchema } from '@/features/editableUserItem/model/types/editableKeyItemSchema';
import { EditableRoleSchema } from '@/features/editableRoleItem/model/types/editableRoleItemSchema';
import { EditableLogsSchema } from '@/features/OperationFilters/model/types/editableDeviceItemSchema';

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export interface StateSchema {
    user: UserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Асинхронные редюсеры
    device?: EditableDeviceSchema;
    key?: EditableKeySchema;
    keySlot?: EditableKeySlotSchema
    users?: EditableUserItemSchema
    role?: EditableRoleSchema
    operations?: EditableLogsSchema
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: UnknownAction,
    ) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}