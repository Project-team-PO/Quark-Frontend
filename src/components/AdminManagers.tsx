import { Layout, theme, Timeline, Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Card title="Admin Statistics"
                style={{
                    padding: 15,
                    background: colorBgContainer,
                }}>
                <Timeline
                    items={[
                        {
                            color: 'green',
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            color: 'green',
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            color: 'red',
                            children: (
                                <>
                                    <p>Solve initial network problems 1</p>
                                    <p>Solve initial network problems 2</p>
                                    <p>Solve initial network problems 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: 'gray',
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: 'gray',
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: '#00CCFF',
                            dot: <SmileOutlined />,
                            children: <p>Custom color testing</p>,
                        },
                    ]}
                />
            </Card>
        </Layout>
    );
};
export default App;
