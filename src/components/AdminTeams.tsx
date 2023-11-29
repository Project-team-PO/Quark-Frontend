import { Layout, theme, Table, Card } from 'antd';


const { Header, Content, Footer } = Layout;
//table data
const columns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
    },
    {
        title: 'Position',
        dataIndex: 'Position',
        key: 'Position',
    },
    {
        title: 'Privilege',
        dataIndex: 'Privilage',
        key: 'Privilage',
    }
];
const data: any = [
    { Name: 'Tom', Position: 'Manager', Privilage: 'Admin' },
    { Name: 'Bill', Position: 'Mid', Privilage: 'Admin' },
    { Name: 'Pablo', Position: 'Senior', Privilage: 'Admin' },
    { Name: 'Alex', Position: 'Manager', Privilage: 'Admin' },
    { Name: 'elena', Position: 'Junior', Privilage: 'Admin' },
    { Name: 'Damian', Position: 'Senior', Privilage: 'Admin' },
    { Name: 'Kacper', Position: 'Mid', Privilage: 'Admin' },
    { Name: 'Kamil', Position: 'Junior', Privilage: 'Admin' },
    { Name: 'Kuba', Position: 'Senior', Privilage: 'Admin' },
    { Name: 'Olaf', Position: 'Junior', Privilage: 'Admin' },
    { Name: 'Krzysztof', Position: 'Mid', Privilage: 'Admin' },
];

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            />

            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Card title="Team members"
                    style={{
                        background: colorBgContainer,
                    }}>
                    <div style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Card>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                ©2023 Quark
            </Footer>
        </Layout>
    );
};
export default App;
