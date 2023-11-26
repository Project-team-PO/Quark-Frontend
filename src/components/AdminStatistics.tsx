import React from 'react';
import { Card, Row, Col } from 'antd';

const AdminStatistics: React.FC = () => {
    return (
        <div>
            <Card title="Admin Statistics">
                <Row gutter={16}>
                    <Col span={8}>
                        {/* Add your statistics component here */}
                    </Col>
                    <Col span={8}>
                        {/* Add another statistics component here */}
                    </Col>
                    <Col span={8}>
                        {/* Add another statistics component here */}
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminStatistics;
