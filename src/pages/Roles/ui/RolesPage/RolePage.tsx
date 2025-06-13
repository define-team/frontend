/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role, initRoleTableData } from "@/entities/Role";
import { createRoleData } from "@/features/editableRoleItem/model/services/createRole/createRole";
import { deleteRoleData } from "@/features/editableRoleItem/model/services/deleteRole/deleteRole";
import { updateRoleData } from "@/features/editableRoleItem/model/services/updateRole/updateRole";
import { EditableRoleItem } from "@/features/editableRoleItem/ui/EditableRoleItem/EditableRoleItem";
import { roleTableColumns, tableActions } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Card, Checkbox, Input, Table, Typography } from "antd";
import { Key, memo, useCallback, useEffect, useState } from "react";

const RolePage = memo(() => {
    const [newForm, setNewForm] = useState(false);
    const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Role> | null>(null);
    const [data, setData] = useState<Role[]>([]);
    const dispatch = useAppDispatch();

    const loadRoleData = useCallback(async () => {
        const result = await dispatch(initRoleTableData());
        if (result.meta.requestStatus === 'fulfilled') {
            setData(result.payload as Role[]);
        }
    }, [dispatch]);

    const startEditing = useCallback((role: Role) => {
        if(!role.id) {
            return
        }
        setEditingRoleId(role.id);
        setEditFormData({
            id: role.id,
            name: role.name,
        });
    }, []);

    const cancelEditing = useCallback(() => {
        setEditingRoleId(null);
        setEditFormData(null);
    }, []);

    const saveEditing = useCallback(async () => {
        if (editingRoleId && editFormData) {
            const result = await dispatch(updateRoleData({
                id: editingRoleId,
                ...editFormData
            }));
            
            if (result.meta.requestStatus === 'fulfilled') {
                loadRoleData();
                cancelEditing();
            }
        }
    }, [editingRoleId, editFormData, dispatch, loadRoleData, cancelEditing]);

    const handleDelete = useCallback(async (id: string) => {
        const result = await dispatch(deleteRoleData(id));
        if (result.meta.requestStatus === 'fulfilled') {
            loadRoleData();
        }
    }, [dispatch, loadRoleData]);

    const onCreateDevice = useCallback(async () => {
        const result = await dispatch(createRoleData());
        if (result.meta.requestStatus === 'fulfilled') {
            loadRoleData();
            setNewForm(false);
        }
    }, [dispatch, loadRoleData]);

    const handleNewDeviceForm = () => {
        setNewForm(!newForm);
    };

    const getColumns = useCallback(() => {
        const baseColumns = [...roleTableColumns];
        
        const actionsColumn = tableActions({
            editingId: editingRoleId,
            onSave: saveEditing,
            onCancel: cancelEditing,
            onUpdate: startEditing,
            onDelete: handleDelete
        });
        
        return baseColumns.map(column => {
            if (column.key === 'name') {
                
                return {
                    ...column,
                    render: (text: string, record: Role) => {
                        if (record.id === editingRoleId) {
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
    }, [editingRoleId, saveEditing, cancelEditing, startEditing, handleDelete, editFormData]);

    useEffect(() => {
        loadRoleData();
    }, [loadRoleData]);

    return (
        <>
            <Typography.Title level={3}>Управление Ролями</Typography.Title>
            <Card>
                <Button onClick={handleNewDeviceForm}>Добавить Роль</Button>
            </Card>
            {newForm && 
                <Card>
                    <EditableRoleItem 
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

export default RolePage;