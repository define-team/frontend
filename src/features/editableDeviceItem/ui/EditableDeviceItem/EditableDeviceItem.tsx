import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback } from "react"
import { deviceActions, deviceReducer } from "../../model/slice/deviceSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getDeviceForm } from "../../model/selectors/getDeviceForm/getDeviceForm";
import { getDeviceLoading } from "../../model/selectors/getDeviceLoading/getDeviceLoading";
import { getDeviceError } from "../../model/selectors/getDeviceError/getDeviceError";
import { getDeviceValidateErrors } from "../../model/selectors/getDeviceValidateErrors/getDeviceValidateErrors";
import { ValidateDeviceError } from "../../model/consts/consts";
import { Button, Flex, Input } from "antd";
import { createDeviceData } from "../../model/services/createDevice/createDevice";
import { useForceUpdate } from "@/shared/lib/render/forceUpdate";

interface EditableDeviceItemProps {
    id?: string
    isOpen: boolean
    handleOpen: () => void
    handleCreate: () => void
}

const reducers: ReducersList = {
    device: deviceReducer,
};

export const EditableDeviceItem = memo((props: EditableDeviceItemProps) => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getDeviceForm);
    const isLoading = useSelector(getDeviceLoading);
    const error = useSelector(getDeviceError);
    const validateErrors = useSelector(getDeviceValidateErrors);

    const validateErrorTranslates = {
        [ValidateDeviceError.SERVER_ERROR]: ('Серверная ошибка при сохранении'),
        [ValidateDeviceError.INCORRECT_COUNTRY]: ('Некорректный регион'),
        [ValidateDeviceError.NO_DATA]: ('Данные не указаны'),
        [ValidateDeviceError.INCORRECT_USER_DATA]: ('Имя и фамилия обязательны'),
        [ValidateDeviceError.INCORRECT_AGE]: ('Некорректный возраст'),
    };

    const onChangeAuthToken = useCallback(
        (value?: string) => {
            dispatch(deviceActions.updateDevice({ auth_token: value || '' }))
        },
        [dispatch],
    );

    const onChangeIpAddress = useCallback(
        (value?: string) => {
            dispatch(deviceActions.updateDevice({ ip_address: value || '' }));
        },
        [dispatch],
    );

    const onChangeTimeout = useCallback(
        (value?: string) => {
            dispatch(deviceActions.updateDevice({ timeout: Number(value) || undefined }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input placeholder="Токен" onChange={(e) => onChangeAuthToken(e.target.value)} />
                <Input placeholder="Ip адресс"  onChange={(e) => onChangeIpAddress(e.target.value)} />
                <Input placeholder="Время жизни"  onChange={(e) => onChangeTimeout(e.target.value)} />
            </Flex>
            <Flex style={{ gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="solid"color="green" onClick={props.handleCreate}>Создать</Button>
                <Button variant="solid"color="danger" onClick={props.handleOpen}>Отменить</Button>
            </Flex>
        </DynamicModuleLoader>
    )
})