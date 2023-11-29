import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, MessageOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Divider } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

const AdminStatistics: React.FC = () => {
    // Dummy data for the chart
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: [
            'Idle users',
            'Active users',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };
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
                <Divider orientation="left"></Divider>
                <Row gutter={16}>
                    <Card bordered={false}>
                        <Doughnut data={data} />
                    </Card>


                </Row>
                <Divider orientation="left"></Divider>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card bordered={false}>
                            {/* <Line data={lineChartData} /> */}

                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminStatistics;
