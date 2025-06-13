import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback } from "react"
import { usersActions, usersReducer } from "../../model/slice/userSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserForm } from "../../model/selectors/getUserForm/getUserForm";
import { getUserLoading } from "../../model/selectors/getUserLoading/getUserLoading";
import { getUserError } from "../../model/selectors/getUserError/getUserError";
import { getUserValidateErrors } from "../../model/selectors/getUserValidateErrors/getUserValidateErrors";
import { ValidateUserError } from "../../model/consts/consts";
import { Button, Flex, Input } from "antd";

interface EditableUsersItemProps {
    id?: string
    isOpen: boolean
    handleOpen: () => void
    handleCreate: () => void
}

const reducers: ReducersList = {
    users: usersReducer,
};

export const EditableUserItem = memo((props: EditableUsersItemProps) => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getUserForm);
    const isLoading = useSelector(getUserLoading);
    const error = useSelector(getUserError);
    const validateErrors = useSelector(getUserValidateErrors);

    const validateErrorTranslates = {
        [ValidateUserError.SERVER_ERROR]: ('Серверная ошибка при сохранении'),
        [ValidateUserError.INCORRECT_COUNTRY]: ('Некорректный регион'),
        [ValidateUserError.NO_DATA]: ('Данные не указаны'),
        [ValidateUserError.INCORRECT_USER_DATA]: ('Имя и фамилия обязательны'),
        [ValidateUserError.INCORRECT_AGE]: ('Некорректный возраст'),
    };

    const onChangeRoleId = useCallback(
        (value?: string) => {
            dispatch(usersActions.updateUserItem({ role_id: value || '' }))
        },
        [dispatch],
    );
    
    const onChangeName = useCallback(
        (value?: string) => {
            dispatch(usersActions.updateUserItem({ name: value || undefined }));
        },
        [dispatch],
    );

    const onChangeNfcTag = useCallback(
        (value?: string) => {
            dispatch(usersActions.updateUserItem({ nfc_tag: value || undefined }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input placeholder="Имя"  onChange={(e) => onChangeName(e.target.value)} />
                <Input placeholder="NFC тег"  onChange={(e) => onChangeNfcTag(e.target.value)} />
                <Input placeholder="Id роли" onChange={(e) => onChangeRoleId(e.target.value)} />
            </Flex>
            <Flex style={{ gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="solid"color="green" onClick={props.handleCreate}>Создать</Button>
                <Button variant="solid"color="danger" onClick={props.handleOpen}>Отменить</Button>
            </Flex>
        </DynamicModuleLoader>
    )
})