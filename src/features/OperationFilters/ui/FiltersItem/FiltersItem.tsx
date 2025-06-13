import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback, useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getOperationFilters } from "../../model/selectors/getOperationFilters/getOperationFilters";
import { getOperationLoading } from "../../model/selectors/getOperationLoading/getOperationLoading";
import { getOperationFilteredData } from "../../model/selectors/getOperationFilteredData/getOperationFilteredData";
import { operationActions, operationReducer } from "../../model/slice/operationSlice";
import { Button, Flex, Input } from "antd";

interface EditableDeviceItemProps {
    id?: string
    handleCreate: () => void
}

const reducers: ReducersList = {
    operations: operationReducer,
};

export const FiltersItem = memo((props: EditableDeviceItemProps) => {
    const dispatch = useAppDispatch();
    const operations = useSelector(getOperationFilteredData);
    const filters = useSelector(getOperationFilters);
    const isLoading = useSelector(getOperationLoading);

    console.log(operations)

    const onSetIdDeviceFilter = useCallback(
        (value?: string) => {
            dispatch(operationActions.setFilter({ device_id: Number(value) || undefined  }))
        },
        [dispatch],
    );
        
    const onSetKeyNumberFilter = useCallback(
        (value?: string) => {
            dispatch(operationActions.setFilter({ key_number: Number(value) || undefined  }));
        },
        [dispatch],
    );
        
    const onSetIdUserFilter = useCallback(
        (value?: string) => {
            dispatch(operationActions.setFilter({ user_id: value || undefined }));
        },
        [dispatch],
    );

    useEffect(() => {
        operationActions.loadFilters()
    },[])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex style={{ gap: '15px', marginBottom: '15px' }}>
                <Input value={filters?.user_id} placeholder="Id пользователя" onChange={(e) => onSetIdUserFilter(e.target.value)} />
                <Input value={filters?.key_number} placeholder="Номер ключа" onChange={(e) => onSetKeyNumberFilter(e.target.value)} />
                <Input value={filters?.device_id} placeholder="Id устройства" onChange={(e) => onSetIdDeviceFilter(e.target.value)} />
            </Flex>
            <Button variant="solid"color="green" onClick={() => dispatch(operationActions.setFilter({}))}>Принять</Button>
        </DynamicModuleLoader>
    )
})