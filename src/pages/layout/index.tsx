import { Card, Flex, Table, Typography } from "antd";

const columns = [
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Событие',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Пользователь',
      dataIndex: 'user',
      key: 'user',
    },
    {
        title: 'Ключ',
        dataIndex: 'keyFor',
        key: 'keyFor',
    },
];

const dataSource = [
    {
      key: '1',
      time: '10:23:45',
      event: 'Ключ выдан',
      user: 'Иванов А.П.',
      keyFor: 'Ключ от склада №12',
    },
    {
        key: '2',
        time: '10:15:32',
        event: 'Ключ возвращён',
        user: 'Петрова С.И.',
        keyFor: 'Ключ от офиса 304',
    },
    {
        key: '3',
        time: '09:58:11',
        event: 'Доступ разрешён',
        user: 'Сидоров В.М.',
        keyFor: 'Ключ от серверной',
    },
  ];

const LayoutPage = () => {
    return (
        <>
            <Typography.Title level={3}>Главная панель</Typography.Title>
            <Flex gap={15} wrap="wrap" style={{ width: '100%' }}>
                <Card 
                    title={<Typography.Title level={4}>Ключи в работе</Typography.Title>}
                    style={{ flex: 1, minWidth: 300 }}
                >
                    <Typography.Title level={3}>12</Typography.Title>
                </Card>
                <Card 
                    title={<Typography.Title level={4}>Активные пользователи</Typography.Title>}
                    style={{ flex: 1, minWidth: 300 }}
                >
                    <Typography.Title level={3}>5</Typography.Title>
                </Card>
                <Card 
                    title={<Typography.Title level={4}>Свободные ключи</Typography.Title>}
                    style={{ flex: 1, minWidth: 300 }}
                >
                    <Typography.Title level={3}>23</Typography.Title>
                </Card>
            </Flex>
            <Card title={<Typography.Title level={3}>Последние события</Typography.Title>} style={{ marginTop: '25px' }}>
                <Table columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}

export default LayoutPage