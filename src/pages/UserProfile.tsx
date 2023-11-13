import React, { useState } from 'react';
import { Modal } from 'antd';
import { Avatar, Tooltip, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserProfile = ({selectedUsername}: {selectedUsername: string}) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    return (
        <>
            <Tooltip title="User Profile" >
                <Avatar onClick={handleOpenModal} size="large" icon={<UserOutlined />} style={{ marginRight: '16px' }} />
                <span onClick={handleOpenModal} style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedUsername}</span>
            </Tooltip>
            <Modal
                title="User Profile"
                visible={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                        <Avatar style={{height: '140px', width: '140px'}} />
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Username: <span style={{fontWeight: 'normal'}}>{selectedUsername}</span></p>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Name: </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Email: </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Department: </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Position: </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Phone Number: </p>
                    </div>
                </div>
                <Divider />
                <div style={{ marginTop: '16px' }}>
                    <h3 style={{ fontWeight: 'bold' }}>Summary:</h3>
                    <p style={{ margin: '16px 0' }}></p>
                </div>
                
            </Modal>
        </>
    );
};

export default UserProfile;
