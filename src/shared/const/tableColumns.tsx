/* eslint-disable @typescript-eslint/no-explicit-any */
import { Operation } from "@/entities/Logs";
import { Button, Space } from "antd"

export const deviceTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Токен',
      dataIndex: 'auth_token',
      key: 'auth_token',
    },
    {
      title: 'Ip адресс',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
        title: 'Время жизни',
        dataIndex: 'timeout',
        key: 'timeout',
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
        title: 'Дата обновления',
        dataIndex: 'updated_at',
        key: 'updated_at',
    },
]

export const keyTableColumns = [
    {
      title: 'Id роли',
      dataIndex: 'assigned_role_id',
      key: 'assigned_role_id',
    },
    {
      title: 'Id устройства',
      dataIndex: 'device_id',
      key: 'device_id',
    },
    {
      title: 'Id слота',
      dataIndex: 'key_slot_id',
      key: 'key_slot_id',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Используется',
      dataIndex: 'is_taken',
      key: 'is_taken',
    },
    {
      title: 'Номер ключа',
      dataIndex: 'key_number',
      key: 'key_number',
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Дата обновления',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
];

export const keySlotTableColumns = [
    {
      title: 'Id устройства',
      dataIndex: 'device_id',
      key: 'device_id',
    },
    {
      title: 'Номер ключа',
      dataIndex: 'key_number',
      key: 'key_number',
    },
    {
      title: 'Id слота',
      dataIndex: 'slot_id',
      key: 'slot_id',
    },
    {
      title: 'Номер слота',
      dataIndex: 'slot_number',
      key: 'slot_number',
    }
];

export const usersTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'NFC тег',
      dataIndex: 'nfc_tag',
      key: 'nfc_tag',
    },
    {
      title: 'Id роли',
      dataIndex: 'role_id',
      key: 'role_id',
    },
    {
      title: 'Имя роли',
      dataIndex: 'role_name',
      key: 'role_name',
    }
];

export const roleTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя роли',
      dataIndex: 'name',
      key: 'name',
    },
]

export const LogsTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Id устройства',
      dataIndex: 'device_id',
      key: 'device_id',
    },
    {
      title: 'Номер ключа',
      dataIndex: 'key_number',
      key: 'key_number',
    },
    {
      title: 'Время',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Id пользователя',
      dataIndex: 'user_id',
      key: 'user_id',
    }
];

interface ActionsTableProps {
  editingId?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
  onUpdate?: (record: any) => void;
  onDelete?: (id: string) => void;
}

export const tableActions = ({
  editingId,
  onSave,
  onCancel,
  onUpdate,
  onDelete,
}: ActionsTableProps) => [
  {
    title: 'Действия',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        {((record.id === editingId) || (record.slot_id === editingId)) ? (
          <>
            <Button type="primary" onClick={onSave}>Сохранить</Button>
            <Button onClick={onCancel}>Отменить</Button>
          </>
        ) : (
          <>
            {onUpdate && <Button type="primary" onClick={() => onUpdate(record)}>Изменить</Button>}
            {onDelete && <Button danger onClick={() => onDelete(record.id || record.slot_id)}>Удалить</Button>}
          </>
        )}
      </Space>
    )
  }
];

export const logsData: Operation[] = [
  {
    device_id: "be3e5c8f",
    id: 2,
    key_number: "102",
    timestamp: "2025-06-12T17:38:57.632408",
    type: 'RETURN',
    user_id: "5c7b1adb"
  },
  {
    device_id: "be3e5c8f",
    id: 1,
    key_number: "102",
    timestamp: "2025-06-12T17:29:03.959853",
    type: "TAKE",
    user_id: "c01d6032"
  }
]