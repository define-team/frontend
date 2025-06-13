import { Button, Card, Table, Typography } from "antd"

const columns = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Привязанный пользователь',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Дата активации',
      dataIndex: 'date',
      key: 'date',
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
        uid: '04:A3:2B:8C',
        user: 'Иванов А.П.',
        date: '2023-10-15',
        status: 'Активна',
        actions: ['Редактировать', 'Удалить']
    },
    {
        key: '1',
        uid: '05:B4:3C:9D',
        user: 'Петрова С.И.',
        date: '2023-10-16',
        status: 'Активна',
        actions: ['Редактировать', 'Удалить']
    },
].map((el) => ({
    ...el,
    actions: el.actions.map((action) => <Button key={action} style={{ marginRight: '15px' }}>{action}</Button>)
  }));

const Nfc = () => {
    return (
        <>
            <Typography.Title level={3}>Управление NFC-метками</Typography.Title>
            <Card>
                <Button>Добавить метку</Button>
            </Card>
            <Card title={<Typography.Title level={4}>Список меток</Typography.Title>} style={{ marginTop: '15px' }}>
                <Table columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}

export default Nfc