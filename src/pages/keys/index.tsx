import { Button, Card, Table, Typography } from "antd"

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Местоположение',
      dataIndex: 'position',
      key: 'position',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
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
        id: '101',
        description: 'Ключ от главного входа',
        position: 'Стойка охраны',
        status: 'Доступен',
        actions: ['Редактировать', 'Удалить']
    },
    {
        key: '2',
        id: '102',
        description: 'Ключ от серверной',
        position: 'Стойка администратора',
        status: 'Выдан',
        actions: ['Редактировать', 'Удалить']
    },
].map((el) => ({
    ...el,
    actions: el.actions.map((action) => <Button key={action} style={{ marginRight: '15px' }}>{action}</Button>)
  }));

const Keys = () => {
    return (
        <>
            <Typography.Title level={3}>Управление ключами</Typography.Title>
            <Card>
                <Button>Добавить ключ</Button>
            </Card>
            <Card title={<Typography.Title level={4}>Список ключей</Typography.Title>} style={{ marginTop: '15px' }}>
                <Table columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}

export default Keys