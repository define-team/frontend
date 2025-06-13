import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback } from "react"
import { keyActions, keyReducer } from "../../model/slice/keySlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getKeyForm } from "../../model/selectors/getKeyForm/getKeyForm";
import { getKeyLoading } from "../../model/selectors/getKeyLoading/getKeyLoading";
import { getKeyError } from "../../model/selectors/getKeyError/getKeyError";
import { getKeyValidateErrors } from "../../model/selectors/getKeyValidateErrors/getKeyValidateErrors";
import { ValidateKeyError } from "../../model/consts/consts";
import { Button, Flex, Input } from "antd";
import { createKeyData } from "../../model/services/createKey/createKey";

interface EditableKeyItemProps {
    id?: string
    isOpen: boolean
    handleOpen: () => void
    handleCreate: () => void
}

const reducers: ReducersList = {
    key: keyReducer,
};

export const EditableKeyItem = memo((props: EditableKeyItemProps) => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getKeyForm);
    const isLoading = useSelector(getKeyLoading);
    const error = useSelector(getKeyError);
    const validateErrors = useSelector(getKeyValidateErrors);

    const validateErrorTranslates = {
        [ValidateKeyError.SERVER_ERROR]: ('Серверная ошибка при сохранении'),
        [ValidateKeyError.INCORRECT_COUNTRY]: ('Некорректный регион'),
        [ValidateKeyError.NO_DATA]: ('Данные не указаны'),
        [ValidateKeyError.INCORRECT_USER_DATA]: ('Имя и фамилия обязательны'),
        [ValidateKeyError.INCORRECT_AGE]: ('Некорректный возраст'),
    };

    const onChangeRoleId = useCallback(
        (value?: string) => {
            dispatch(keyActions.updateDevice({ assigned_role_id: value || '' }))
        },
        [dispatch],
    );
    
    const onChangeKeyNumber = useCallback(
        (value?: string) => {
            dispatch(keyActions.updateDevice({ key_number: value || undefined }));
        },
        [dispatch],
    );

    const onChangeKeySlotId = useCallback(
        (value?: string) => {
            dispatch(keyActions.updateDevice({ key_slot_id: value || undefined }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input placeholder="Id роли" onChange={(e) => onChangeRoleId(e.target.value)} />
                <Input placeholder="Номер ключа"  onChange={(e) => onChangeKeyNumber(e.target.value)} />
                <Input placeholder="Id слота ключа"  onChange={(e) => onChangeKeySlotId(e.target.value)} />
            </Flex>
            <Flex style={{ gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="solid"color="green" onClick={props.handleCreate}>Создать</Button>
                <Button variant="solid"color="danger" onClick={props.handleOpen}>Отменить</Button>
            </Flex>
        </DynamicModuleLoader>
    )
})