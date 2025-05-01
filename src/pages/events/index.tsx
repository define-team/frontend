import { Button, Card, DatePicker, Flex, Table, Typography } from "antd"

const columns = [
    {
      title: 'Дата/Время',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Тип события',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Пользователь',
      dataIndex: 'user',
      key: 'user',
    },
    {
        title: 'Ключ/NFC',
        dataIndex: 'key/nfc',
        key: 'key/nfc',
    },
    {
        title: 'Детали',
        dataIndex: 'details',
        key: 'details',
    },
];

const dataSource = [
    {
        key: '1',
        date: '2023-10-17 10:23:45',
        type: 'Выдача ключа',
        user: 'Иванов А.П.',
        'key/nfc': 'Ключ №101',
        details: 'Успешно'
    },
    {
        key: '2',
        date: '2023-10-17 09:15:22',
        type: 'Возврат ключа',
        user: 'Петрова С.И.',
        'key/nfc': 'NFC 05:B4:3C:9D',
        details: 'Успешно'
    },
]

const Events = () => {
    return (
        <>
            <Typography.Title level={3}>Журнал событий</Typography.Title>
            <Card title={<Flex gap={15} style={{ alignItems: 'center' }}>
                <Typography.Text>Период: </Typography.Text>
                <DatePicker />
                <Typography.Text> до </Typography.Text>
                <DatePicker />
                <Button>Фильтровать</Button>
                <Button style={{ marginLeft: 'auto' }}>Экспорт в CSV</Button>
            </Flex>
            } style={{ marginTop: '15px' }}>
                <Table columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}

export default Events