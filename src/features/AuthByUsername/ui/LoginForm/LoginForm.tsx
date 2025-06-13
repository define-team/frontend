import { Button, Typography, Input, Flex } from 'antd';
const { Text } = Typography

import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, username, password, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                    <Flex
                        gap="16"
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text title={'Форма авторизации'} />
                        {error && (
                            <Text
                                content={'Вы ввели неверный логин или пароль'}
                                color='error'
                            />
                        )}
                        <Input
                            autoFocus
                            type="text"
                            className={cls.input}
                            placeholder={'Введите username'}
                            onChange={(e) => onChangeUsername(e.target.value)}
                            value={username}
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={'Введите пароль'}
                            onChange={(e) => onChangePassword(e.target.value)}
                            value={password}
                        />
                        <Button
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {'Войти'}
                        </Button>
                    </Flex>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
