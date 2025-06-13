/* import { Button, Card, Table, Typography } from "antd"

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
    },
];

const dataSource = [
    {
      key: '1',
      id: '1',
      name: 'Иванов Алексей Петрович',
      position: 'Системный администратор',
      phone: '+7 (123) 456-7890',
      actions: ['Редактировать', 'Удалить']
    },
    {
        key: '2',
        id: '2',
        name: 'Петрова Светлана Игоревна',
        position: 'Менеджер',
        phone: '+7 (987) 654-3210',
        actions: ['Редактировать', 'Удалить']
    },
].map((el) => ({
    ...el,
    actions: el.actions.map((action) => <Button key={action} style={{ marginRight: '15px' }}>{action}</Button>)
  }));

const Users = () => {
    return (
        <>
            <Typography.Title level={3}>Управление пользователями</Typography.Title>
            <Card>
                <Button>Добавить пользователя</Button>
            </Card>
            <Card title={<Typography.Title level={4}>Список пользователей</Typography.Title>} style={{ marginTop: '15px' }}>
                <Table columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}

export default Users */