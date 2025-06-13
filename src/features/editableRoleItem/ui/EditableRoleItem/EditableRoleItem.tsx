import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback } from "react"
import { roleActions, roleReducer } from "../../model/slice/roleSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getRoleForm } from "../../model/selectors/getRoleForm/getRoleForm";
import { getRoleLoading } from "../../model/selectors/getRoleLoading/getRoleLoading";
import { getRoleError } from "../../model/selectors/getRoleError/getRoleError";
import { getRoleValidateErrors } from "../../model/selectors/getRoleValidateErrors/getRoleValidateErrors";
import { ValidateRoleError } from "../../model/consts/consts";
import { Button, Flex, Input } from "antd";

interface EditableRoleItemProps {
    id?: string
    isOpen: boolean
    handleOpen: () => void
    handleCreate: () => void
}

const reducers: ReducersList = {
    role: roleReducer,
};

export const EditableRoleItem = memo((props: EditableRoleItemProps) => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getRoleForm);
    const isLoading = useSelector(getRoleLoading);
    const error = useSelector(getRoleError);
    const validateErrors = useSelector(getRoleValidateErrors);

    const validateErrorTranslates = {
        [ValidateRoleError.SERVER_ERROR]: ('Серверная ошибка при сохранении'),
        [ValidateRoleError.INCORRECT_COUNTRY]: ('Некорректный регион'),
        [ValidateRoleError.NO_DATA]: ('Данные не указаны'),
        [ValidateRoleError.INCORRECT_USER_DATA]: ('Имя и фамилия обязательны'),
        [ValidateRoleError.INCORRECT_AGE]: ('Некорректный возраст'),
    };

    const onChangeName = useCallback(
        (value?: string) => {
            dispatch(roleActions.updateRole({ name: value || '' }))
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input placeholder="Имя роли" onChange={(e) => onChangeName(e.target.value)} />
            </Flex>
            <Flex style={{ gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="solid"color="green" onClick={props.handleCreate}>Создать</Button>
                <Button variant="solid"color="danger" onClick={props.handleOpen}>Отменить</Button>
            </Flex>
        </DynamicModuleLoader>
    )
})