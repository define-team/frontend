/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeySlot, initKeySlotTableData } from "@/entities/KeySlot";
import { createKeySlotData } from "@/features/editableKeySlotItem/model/services/createKeySlot/createKeySlot";
import { deleteKeySlotData } from "@/features/editableKeySlotItem/model/services/deleteKeySlot/deleteKeySlot";
import { EditableKeySlotItem } from "@/features/editableKeySlotItem/ui/EditableKeySlotItem/EditableKeySlotItem";
import { keySlotTableColumns, tableActions } from "@/shared/const/tableColumns.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Card, Table, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

const KeySlotsPage = memo(() => {
    const [newForm, setNewForm] = useState(false);
    const [editingKeySlotId, setEditingKeySlotId] = useState<string | null>(null);
    //const [editFormData, setEditFormData] = useState<Partial<KeySlot> | null>(null);
    const [data, setData] = useState<KeySlot[]>([]);
    const dispatch = useAppDispatch();

    const loadKeySlotData = useCallback(async () => {
        const result = await dispatch(initKeySlotTableData());
        if (result.meta.requestStatus === 'fulfilled') {
            setData(result.payload as KeySlot[]);
        }
    }, [dispatch]);

    const cancelEditing = useCallback(() => {
        setEditingKeySlotId(null);
        //setEditFormData(null);
    }, []);

    const handleDelete = useCallback(async (slot_id: string) => {
        const result = await dispatch(deleteKeySlotData(slot_id));
        if (result.meta.requestStatus === 'fulfilled') {
            loadKeySlotData();
        }
    }, [dispatch, loadKeySlotData]);

    const onCreate = useCallback(async () => {
        const result = await dispatch(createKeySlotData());
        if (result.meta.requestStatus === 'fulfilled') {
            loadKeySlotData();
            setNewForm(false);
        }
    }, [dispatch, loadKeySlotData]);

    const handleNewForm = () => {
        setNewForm(!newForm);
    };

    const getColumns = useCallback(() => {
        const actionsColumn = tableActions({
            editingId: editingKeySlotId,
            onCancel: cancelEditing,
            onDelete: handleDelete
        });
        return keySlotTableColumns.concat(actionsColumn)
    }, [editingKeySlotId, cancelEditing, handleDelete]);

    useEffect(() => {
        loadKeySlotData();
    }, [loadKeySlotData]);

    return (
        <>
            <Typography.Title level={3}>Управление Слотами Ключей</Typography.Title>
            <Card>
                <Button onClick={handleNewForm}>Добавить Слот</Button>
            </Card>
            {newForm && 
                <Card>
                    <EditableKeySlotItem 
                        isOpen={newForm} 
                        handleOpen={handleNewForm} 
                        handleCreate={onCreate} 
                    />
                </Card> 
            }
            <Table 
                columns={getColumns()} 
                dataSource={data} 
                rowKey='slot_id'
            />
        </>
    );
});

export default KeySlotsPage;