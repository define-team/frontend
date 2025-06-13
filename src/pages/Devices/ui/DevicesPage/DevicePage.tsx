/* eslint-disable @typescript-eslint/no-explicit-any */
import { Device, deviceActions, DeviceSchema, initDeviceTableData } from "@/entities/Device";
import { createDeviceData } from "@/features/editableDeviceItem/model/services/createDevice/createDevice";
import { deleteDeviceData } from "@/features/editableDeviceItem/model/services/deleteDevice/deleteDevice";
import { updateDeviceData } from "@/features/editableDeviceItem/model/services/updateDevice/updateDevice";
import { EditableDeviceItem } from "@/features/editableDeviceItem/ui/EditableDeviceItem/EditableDeviceItem";
import { deviceTableColumns, tableActions } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { dateFormater } from "@/shared/utils/dateFormater";
import { Button, Card, Input, Table, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

interface FormattedDeviceSchema extends DeviceSchema {
    key: string;
}

const Devices = memo(() => {
    const [newDeviceForm, setNewDeviceForm] = useState(false);
    const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Device> | null>(null);
    const [data, setData] = useState<FormattedDeviceSchema[]>([]);
    const dispatch = useAppDispatch();

    const loadDeviceData = useCallback(async () => {
        const result = await dispatch(initDeviceTableData());
        if (initDeviceTableData.fulfilled.match(result)) {
            // Создаем новые объекты вместо мутации
            const formattedDevices = result.payload.devices.map(device => {
                const formatted: any = { ...device, key: device.id };
                Object.entries(device).forEach(([key, value]) => {
                    if (key.includes('_at') && value) {
                        formatted[key] = dateFormater(value);
                    }
                });
                return formatted as FormattedDeviceSchema;
            });
            setData(formattedDevices);
        }
    }, [dispatch]);

    const cancelEditing = useCallback(() => {
        setEditingDeviceId(null);
        setEditFormData(null);
    }, []);

    const saveEditing = useCallback(async () => {
        if (editingDeviceId && editFormData) {
            const result = await dispatch(updateDeviceData({
                id: editingDeviceId,
                ...editFormData,
            }));
            
            if (updateDeviceData.fulfilled.match(result)) {
                setData(prev => prev.map(device => 
                    device.devices?.find(dev => dev.id === editingDeviceId )
                        ? { ...device, ...editFormData } 
                        : device
                ));
                cancelEditing();
            }
        }
    }, [dispatch, editingDeviceId, editFormData, cancelEditing]);

    const startEditing = useCallback((device: Device) => {
        setEditingDeviceId(device.id);
        setEditFormData({
            auth_token: device.auth_token,
            ip_address: device.ip_address,
            timeout: device.timeout
        });
    }, []);

    // 3. Исправленная функция удаления
    const handleDelete = useCallback(async (deviceId: string) => {
        const result = await dispatch(deleteDeviceData(deviceId));
        if (deleteDeviceData.fulfilled.match(result)) {
            // Обновляем локальное состояние
            setData(prev => prev.filter(device => device.devices?.find((dev) => dev.id === deviceId) !== deviceId));
        }
    }, [dispatch]);

    // 4. Исправленная функция создания
    const onCreateDevice = useCallback(async () => {
        const result = await dispatch(createDeviceData());
        if (createDeviceData.fulfilled.match(result)) {
            // Добавляем новое устройство в локальное состояние
            const newDevice = result.payload;
            const formattedDevice = {
                ...newDevice,
                key: newDevice.id,
                created_at: newDevice.created_at ? dateFormater(newDevice.created_at) : undefined,
                updated_at: newDevice.updated_at ? dateFormater(newDevice.updated_at) : undefined
            } as FormattedDeviceSchema;
            
            setData(prev => [...prev, formattedDevice]);
            setNewDeviceForm(false);
        }
    }, [dispatch]);

    const getColumns = useCallback(() => {
        const baseColumns = [...deviceTableColumns];
        
        // Добавляем колонку действий
        const actionsColumn = tableActions({
            editingId: editingDeviceId,
            onSave: saveEditing,
            onCancel: cancelEditing,
            onUpdate: startEditing,
            onDelete: handleDelete
        });
        
        // Модифицируем колонки для редактирования
        return baseColumns.map(column => {
            if (column.key === 'auth_token' || 
                column.key === 'ip_address' || 
                column.key === 'timeout') {
                
                return {
                    ...column,
                    render: (text: string, record: Device) => {
                        if (record.id === editingDeviceId) {
                            return (
                                <Input
                                    value={editFormData?.[column.dataIndex as keyof Device] as string}
                                    onChange={e => setEditFormData(prev => ({
                                        ...prev,
                                        [column.dataIndex]: e.target.value
                                    }))}
                                />
                            );
                        }
                        return text;
                    }
                };
            }
            return column;
        }).concat(actionsColumn);
    }, [editingDeviceId, editFormData, saveEditing, handleDelete]);

    const handleNewDeviceForm = () => {
        setNewDeviceForm(!newDeviceForm);
    };
    
    useEffect(() => {
        loadDeviceData();
        
        // Очистка при размонтировании
        return () => {
            setData([]);
            setEditingDeviceId(null);
            setEditFormData(null);
        };
    }, [loadDeviceData]);

    return (
        <>
            <Typography.Title level={3}>Управление устройствами</Typography.Title>
            <Card>
                <Button onClick={handleNewDeviceForm}>Добавить Устройство</Button>
            </Card>
            {newDeviceForm && 
                <Card>
                    <EditableDeviceItem 
                        isOpen={newDeviceForm} 
                        handleOpen={handleNewDeviceForm} 
                        handleCreate={onCreateDevice} 
                    />
                </Card> 
            }
            <Table 
                columns={getColumns()} 
                dataSource={data} 
                rowKey='id'
                key={data.length}
            />
        </>
    );
});

export default Devices;