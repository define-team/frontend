/* eslint-disable @typescript-eslint/no-explicit-any */
import { Operation, initOperationTableData, operationActions } from "@/entities/Events";
import { getOperationFilters } from "@/features/OperationFilters/model/selectors/getOperationFilters/getOperationFilters";
import { FiltersItem } from "@/features/OperationFilters/ui/FiltersItem/FiltersItem";
import { logsData, LogsTableColumns } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { dateFormater } from "@/shared/utils/dateFormater";
import { Card, Flex, Input, Table, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LogsPage = memo(() => {
    const [data, setData] = useState<Operation[]>([]);
    const dispatch = useAppDispatch();
    const filters = useSelector(getOperationFilters);

    const loadData = useCallback(async () => {
        const result = await dispatch(initOperationTableData(filters));
        if (result.meta.requestStatus === 'fulfilled') {
            const formattedDevices = result.payload!.map(keyObj => {
                const formatted: any = keyObj;
                Object.entries(keyObj).forEach(([key, value]) => {
                    if (key.includes('timestamp')) {
                        formatted[key] = dateFormater(value);
                    }
                });
                return formattedDevices;
            });
            setData(result.payload as Operation[]);
        }
    }, [dispatch, filters]);

    const getColumns = useCallback(() => {
       return LogsTableColumns
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <>
            <Typography.Title level={3}>Журнал событий</Typography.Title>
            <Card title='Фильтры'>
                <FiltersItem handleCreate={loadData} />
            </Card>
            <Table 
                columns={getColumns()} 
                dataSource={data} 
                rowKey='id'
            />
        </>
    );
});

export default LogsPage;