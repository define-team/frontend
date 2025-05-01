import { Button, Card, Input, Select, Table, Typography } from "antd"

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

const Keys = () => {
    return (
        <>
            <Typography.Title level={3}>Настройки системы</Typography.Title>
            <Card title={<Typography.Title level={4}>Параметры системы</Typography.Title>}>
                <Typography.Title level={5}>Название системы</Typography.Title>
                <Input />
                <Typography.Title level={5}>Таймаут возврата (минут)</Typography.Title>
                <Input />
                <Typography.Title level={5}>Уведомления по email</Typography.Title>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    defaultValue={'Выключены'}
                    //onChange={onChange}
                    //onSearch={onSearch}
                    options={[
                    {
                        value: 'off',
                        label: 'Выключены',
                    },
                    {
                        value: 'on',
                        label: 'Включены',
                    },
                    ]}
                    style={{ width: '100%' }}
                />
                <Button style={{ marginTop: '15px' }}>Сохранить настройки</Button>
            </Card>
        </>
    )
}

export default Keys