import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback } from "react"
import { keySlotReducer, keySlotActions } from "../../model/slice/keySlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getKeySlotForm } from "../../model/selectors/getKeySlotForm/getKeySlotForm";
import { getKeySlotLoading } from "../../model/selectors/getKeySlotLoading/getKeySlotLoading";
import { getKeySlotError } from "../../model/selectors/getKeySlotError/getKeySlotError";
import { getKeySlotValidateErrors } from "../../model/selectors/getKeySlotValidateErrors/getKeySlotValidateErrors";
import { ValidateKeySlotError } from "../../model/consts/consts";
import { Button, Flex, Input } from "antd";

interface EditableKeySlotItemProps {
    id?: string
    isOpen: boolean
    handleOpen: () => void
    handleCreate: () => void
}

const reducers: ReducersList = {
    keySlot: keySlotReducer,
};

export const EditableKeySlotItem = memo((props: EditableKeySlotItemProps) => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getKeySlotForm);
    const isLoading = useSelector(getKeySlotLoading);
    const error = useSelector(getKeySlotError);
    const validateErrors = useSelector(getKeySlotValidateErrors);

    const validateErrorTranslates = {
        [ValidateKeySlotError.SERVER_ERROR]: ('Серверная ошибка при сохранении'),
        [ValidateKeySlotError.INCORRECT_COUNTRY]: ('Некорректный регион'),
        [ValidateKeySlotError.NO_DATA]: ('Данные не указаны'),
        [ValidateKeySlotError.INCORRECT_USER_DATA]: ('Имя и фамилия обязательны'),
        [ValidateKeySlotError.INCORRECT_AGE]: ('Некорректный возраст'),
    };

    const onChangeKeySlotNumber = useCallback(
        (value?: string) => {
            dispatch(keySlotActions.createKeySlot({ slot_number: Number(value) || undefined }));
        },
        [dispatch],
    );

    const onChangeDeviceId = useCallback(
        (value?: string) => {
            dispatch(keySlotActions.createKeySlot({ device_id: value || undefined }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input placeholder="Id устройства" onChange={(e) => onChangeDeviceId(e.target.value)} />
                <Input placeholder="Номер слота"  onChange={(e) => onChangeKeySlotNumber(e.target.value)} />
            </Flex>
            <Flex style={{ gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="solid"color="green" onClick={props.handleCreate}>Создать</Button>
                <Button variant="solid"color="danger" onClick={props.handleOpen}>Отменить</Button>
            </Flex>
        </DynamicModuleLoader>
    )
})