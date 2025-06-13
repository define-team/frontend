/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserItem, initUsersTableData } from "@/entities/Users";
import { createUserData } from "@/features/editableUserItem/model/services/createUser/createUser";
import { deleteUserData } from "@/features/editableUserItem/model/services/deleteUser/deleteUser";
import { updateUserData } from "@/features/editableUserItem/model/services/updateUser/updateUser";
import { EditableUserItem } from "@/features/editableUserItem/ui/EditableUserItem/EditableUserItem";
import { usersTableColumns, tableActions } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Card, Checkbox, Input, Table, Typography } from "antd";
import { Key, memo, useCallback, useEffect, useState } from "react";

const UsersPage = memo(() => {
    const [newForm, setNewForm] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<UserItem> | null>(null);
    const [data, setData] = useState<UserItem[]>([]);
    const dispatch = useAppDispatch();

    const loadUsersData = useCallback(async () => {
        const result = await dispatch(initUsersTableData());
        if (result.meta.requestStatus === 'fulfilled') {
            setData(result.payload as UserItem[]);
        }
    }, [dispatch]);

    const startEditing = useCallback((user: UserItem) => {
        if(!user.id) {
            return
        }
        setEditingUserId(user.id);
        setEditFormData({
            id: user.id,
            name: user.name,
            nfc_tag: user.nfc_tag,
            role_id: user.role_id,
            role_name: user.role_name
        });
    }, []);

    const cancelEditing = useCallback(() => {
        setEditingUserId(null);
        setEditFormData(null);
    }, []);

    const saveEditing = useCallback(async () => {
        if (editingUserId && editFormData) {
            const result = await dispatch(updateUserData({
                id: editingUserId,
                ...editFormData
            }));
            
            if (result.meta.requestStatus === 'fulfilled') {
                loadUsersData();
                cancelEditing();
            }
        }
    }, [editingUserId, editFormData, dispatch, loadUsersData, cancelEditing]);

    const handleDelete = useCallback(async (id: string) => {
        const result = await dispatch(deleteUserData(id));
        if (result.meta.requestStatus === 'fulfilled') {
            loadUsersData();
        }
    }, [dispatch, loadUsersData]);

    const onCreateDevice = useCallback(async () => {
        const result = await dispatch(createUserData());
        if (result.meta.requestStatus === 'fulfilled') {
            loadUsersData();
            setNewForm(false);
        }
    }, [dispatch, loadUsersData]);

    const handleNewDeviceForm = () => {
        setNewForm(!newForm);
    };

    // Обновляем колонки для поддержки редактирования
    const getColumns = useCallback(() => {
        const baseColumns = [...usersTableColumns];
        
        // Добавляем колонку действий
        const actionsColumn = tableActions({
            editingId: editingUserId,
            onSave: saveEditing,
            onCancel: cancelEditing,
            onUpdate: startEditing,
            onDelete: handleDelete
        });
        
        // Модифицируем колонки для редактирования
        return baseColumns.map(column => {
            if (column.key === 'name' || 
                column.key === 'nfc_tag' || 
                column.key === 'role_id') {
                
                return {
                    ...column,
                    render: (text: string, record: UserItem) => {
                        if (record.id === editingUserId) {
                            return (
                                {...column.key !== 'is_taken' ? (
                                    <Input
                                        value={editFormData?.[column.dataIndex as keyof Key] as unknown as string || ''}
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
    }, [editingUserId, saveEditing, cancelEditing, startEditing, handleDelete, editFormData]);

    useEffect(() => {
        loadUsersData();
    }, [loadUsersData]);

    return (
        <>
            <Typography.Title level={3}>Управление Пользователями</Typography.Title>
            <Card>
                <Button onClick={handleNewDeviceForm}>Добавить Пользователя</Button>
            </Card>
            {newForm && 
                <Card>
                    <EditableUserItem
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

export default UsersPage;