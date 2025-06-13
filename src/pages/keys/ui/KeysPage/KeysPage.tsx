/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, initKeyTableData } from "@/entities/Key";
import { createKeyData } from "@/features/editableKeyItem/model/services/createKey/createKey";
import { deleteKeyData } from "@/features/editableKeyItem/model/services/deleteKey/deleteKey";
import { updateKeyData } from "@/features/editableKeyItem/model/services/updateKey/updateKey";
import { EditableKeyItem } from "@/features/editableKeyItem/ui/EditableKeyItem/EditableKeyItem";
import { keyTableColumns, tableActions } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Card, Checkbox, Input, Table, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

const KeysPage = memo(() => {
    const [newForm, setNewForm] = useState(false);
    const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Key> | null>(null);
    const [data, setData] = useState<Key[]>([]);
    const dispatch = useAppDispatch();

    const loadDeviceData = useCallback(async () => {
        const result = await dispatch(initKeyTableData());
        if (result.meta.requestStatus === 'fulfilled') {
            /* const formattedDevices = result.payload!.map(keyObj => {
                const formatted: any = keyObj;
                Object.entries(keyObj).forEach(([key, value]) => {
                    if (key.includes('_at')) {
                        formatted[key] = dateFormater(value);
                    }
                });
                return formatted;
            }); */
            setData(result.payload as Key[]);
        }
    }, [dispatch]);

    const startEditing = useCallback((key: Key) => {
        if(!key.id) {
            return
        }
        setEditingKeyId(key.id);
        setEditFormData({
            assigned_role_id: key.assigned_role_id,
            is_taken: key.is_taken,
            key_number: key.key_number,
            key_slot_id: key.key_slot_id
        });
    }, []);

    const cancelEditing = useCallback(() => {
        setEditingKeyId(null);
        setEditFormData(null);
    }, []);

    const saveEditing = useCallback(async () => {
        if (editingKeyId && editFormData) {
            const result = await dispatch(updateKeyData({
                id: editingKeyId,
                ...editFormData
            }));
            
            if (result.meta.requestStatus === 'fulfilled') {
                loadDeviceData();
                cancelEditing();
            }
        }
    }, [dispatch, editingKeyId, editFormData, loadDeviceData, cancelEditing]);

    const handleDelete = useCallback(async (id: string) => {
        const result = await dispatch(deleteKeyData(id));
        if (result.meta.requestStatus === 'fulfilled') {
            loadDeviceData();
        }
    }, [dispatch, loadDeviceData]);

    const onCreateDevice = useCallback(async () => {
        const result = await dispatch(createKeyData());
        if (result.meta.requestStatus === 'fulfilled') {
            loadDeviceData();
            setNewForm(false);
        }
    }, [dispatch, loadDeviceData]);

    const handleNewDeviceForm = () => {
        setNewForm(!newForm);
    };

    // Обновляем колонки для поддержки редактирования
    const getColumns = useCallback(() => {
        const baseColumns = [...keyTableColumns];
        
        // Добавляем колонку действий
        const actionsColumn = tableActions({
            editingId: editingKeyId,
            onSave: saveEditing,
            onCancel: cancelEditing,
            onUpdate: startEditing,
            onDelete: handleDelete
        });
        
        // Модифицируем колонки для редактирования
        return baseColumns.map(column => {
            if (column.key === 'assigned_role_id' || 
                column.key === 'is_taken' || 
                column.key === 'key_number' ||
                column.key === 'key_slot_id') {
                
                return {
                    ...column,
                    render: (text: string, record: Key) => {
                        if (record.id === editingKeyId) {
                            return (
                                {...column.key !== 'is_taken' ? (
                                    <Input
                                        value={editFormData?.[column.dataIndex as keyof Key] as string || ''}
                                        onChange={e => setEditFormData(prev => ({
                                        ...prev,
                                        [column.dataIndex]: e.target.value
                                        }))}
                                    />
                                    ) : (
                                    <Checkbox
                                        checked={!!editFormData?.[column.dataIndex as keyof Key]}
                                        onChange={e => setEditFormData(prev => ({
                                        ...prev,
                                        [column.dataIndex]: e.target.checked
                                        }))}
                                    >
                                    </Checkbox>
                                    )}
                            );
                        }
                        return text;
                    }
                };
            }
            return column;
        }).concat(actionsColumn);
    }, [editingKeyId, editFormData, saveEditing, cancelEditing, startEditing, handleDelete]);

    useEffect(() => {
        loadDeviceData();
    }, [loadDeviceData]);

    return (
        <>
            <Typography.Title level={3}>Управление Ключами</Typography.Title>
            <Card>
                <Button onClick={handleNewDeviceForm}>Добавить Ключ</Button>
            </Card>
            {newForm && 
                <Card>
                    <EditableKeyItem 
                        isOpen={newForm} 
                        handleOpen={handleNewDeviceForm} 
                        handleCreate={onCreateDevice} 
                    />
                </Card> 
            }
            <Table 
                columns={getColumns()} 
                dataSource={data} 
                rowKey='id'
            />
        </>
    );
});

export default KeysPage;