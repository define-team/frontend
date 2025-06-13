import { Button, Layout, Typography } from 'antd'
const  { Text } = Typography
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData, getUserInited } from '@/entities/User';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const inited = useSelector(getUserInited);

    console.log(inited)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = { name: 'Navbar' }

    return (
        <Layout.Header className={classNames(mainClass.name, {}, [className])}>
            <Typography.Title level={1} style={{ color: 'white', margin: 0, alignContent: 'center' }}>Умная ключница - Админ панель</Typography.Title>
            {authData ? 
            <Typography.Title level={4} style={{ color: 'white', margin: 0, alignContent: 'center' }}>
                Admin
            </Typography.Title> 
            : 
            <Button
                variant="outlined"
                className={cls.links}
                onClick={onShowModal}
            >
            Войти
            </Button>}

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </Layout.Header>
    );
});
