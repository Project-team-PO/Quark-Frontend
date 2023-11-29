import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, MessageOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Divider } from 'antd';

const AdminStatistics: React.FC = () => {
    return (
        <div>
            <Card title="Admin Statistics">

                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Active users"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Idle users"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider orientation="left"></Divider>
                <Row gutter={16} style={{ marginTop: '2rem', padding: '1rem' }}>
                    <Col span={12}>
                        <Statistic title="Today messages" value={1128} prefix={<MessageOutlined />} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="new users" value={93} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminStatistics;
