import React from 'react';
import { Layout, theme, Carousel, Table, Col, Divider, Row, Card, Image } from 'antd';
import Quark from "../assets/Quark.png"

const { Header, Content, Footer } = Layout;
//table data
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <a>{text}</a>,
  },
  {
    title: 'Position',
    dataIndex: 'Position',
    key: 'Position',
  }
];
const data: any = [];

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3dvh' }}>
          <Image src={Quark} preview={false} width={200} />
        </div>

        <Card>
          <span style={{ fontSize: 20, color: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Dashboard</span>
          <Divider orientation="left"></Divider>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Row justify="start" gutter={16}>
              <Col span={8}> <Card style={{ background: "#0092ff" }} title="Active users" bordered={false}>
                12M
              </Card></Col>
              <Col span={8}> <Card style={{ background: "#ffc107" }} title="Total accounts" bordered={false}>
                123M
              </Card></Col>
              <Col span={8}> <Card style={{ background: "#e78493" }} title="Messages sent" bordered={false}>
                1000693M
              </Card></Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Carousel style={{
              margin: 0,
              height: '260px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
            }}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Carousel>
          </div>
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
