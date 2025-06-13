import { Card, Table, Typography } from "antd";

interface TableLayoutProps {
    title: string
    columns: Record<string, string>[]
    dataSource: string[]
}

export const TableLayout = (data: TableLayoutProps) => {
    return (
        <>
            <Card title={<Typography.Title level={3}>{data.title}</Typography.Title>} style={{ marginTop: '25px' }}>
                <Table columns={data.columns} dataSource={data.dataSource}></Table>
            </Card>
        </>
    )
}