import { Suspense } from 'react';
import { Modal } from 'antd';
import { Loader } from '@/shared/ui/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        title="Авторизация"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
