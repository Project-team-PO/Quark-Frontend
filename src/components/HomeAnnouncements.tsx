import React, { useState } from 'react';
import { Card, List, Avatar, Form, Input, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from "../styles/Pages/UserSearch.module.css";

interface Announcement {
    id: number;
    title: string;
    content: string;
    name: string;
    avatar: string;
    timeAdded: Date;
}

const Announcements: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        { id: 1, title: 'Announcement 1', content: 'Lorem ipsum dolor sit amet.', name: 'John Doe', avatar: 'https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=400&d=robohash&r=x', timeAdded: new Date() },
        { id: 2, title: 'Announcement 2', content: 'Consectetur adipiscing elit.', name: 'Jane Smith', avatar: 'https://gravatar.com/avatar/e256ee7e3632912a9c92d7b6a0e5da1c?s=400&d=robohash&r=x', timeAdded: new Date() },
        { id: 3, title: 'Announcement 3', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', name: 'Mike Johnson', avatar: 'https://robohash.org/80f547dd22750fb99c5775ae0be02ba4?set=set4&bgset=&size=400x400', timeAdded: new Date() },
        { id: 4, title: 'Announcement 4', content: 'Ut enim ad minim veniam.', name: 'Kate Smith', avatar: 'https://robohash.org/743c9e200055c8c03550590dcb5446f7?set=set3&bgset=bg1&size=400x400', timeAdded: new Date() },
        { id: 5, title: 'Announcement 5', content: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', name: 'John Doe', avatar: 'https://robohash.org/5bc74aecf66971889e3b9064e87f2423?set=set4&bgset=&size=400x400', timeAdded: new Date() },
        { id: 1, title: 'Announcement 1', content: 'Lorem ipsum dolor sit amet.', name: 'John Doe', avatar: 'https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=400&d=robohash&r=x', timeAdded: new Date() },
        { id: 2, title: 'Announcement 2', content: 'Consectetur adipiscing elit.', name: 'Jane Smith', avatar: 'https://gravatar.com/avatar/e256ee7e3632912a9c92d7b6a0e5da1c?s=400&d=robohash&r=x', timeAdded: new Date() },
        { id: 3, title: 'Announcement 3', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', name: 'Mike Johnson', avatar: 'https://robohash.org/80f547dd22750fb99c5775ae0be02ba4?set=set4&bgset=&size=400x400', timeAdded: new Date() },
        { id: 4, title: 'Announcement 4', content: 'Ut enim ad minim veniam.', name: 'Kate Smith', avatar: 'https://robohash.org/743c9e200055c8c03550590dcb5446f7?set=set3&bgset=bg1&size=400x400', timeAdded: new Date() },
        { id: 5, title: 'Announcement 5', content: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', name: 'John Doe', avatar: 'https://robohash.org/5bc74aecf66971889e3b9064e87f2423?set=set4&bgset=&size=400x400', timeAdded: new Date() },
    ]);

    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);

    const handleAddAnnouncement = () => {
        form.validateFields().then((values) => {
            const newAnnouncement: Announcement = {
                id: announcements.length + 1,
                title: values.title,
                content: values.content,
                name: values.name,
                avatar: 'https://robohash.org/placeholder?set=set4&bgset=&size=400x400',
                timeAdded: new Date(),
            };

            setAnnouncements([...announcements, newAnnouncement]);
            form.resetFields();
            setShowModal(false);
        });
    };

    return (
        <Card className={styles.user_search_container} style={{ background: '#FFFFFF', padding: '24px', minHeight: '360px' }}>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setShowModal(true)} style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
            <Modal
                title="Add Announcement"
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onOk={handleAddAnnouncement}
            >
                <Form form={form}>
                    <Form.Item name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="content" rules={[{ required: true, message: 'Please enter the content' }]}>
                        <Input.TextArea placeholder="Content" />
                    </Form.Item>
                </Form>
            </Modal>
            <List
                dataSource={announcements}
                renderItem={(item) => (
                    <>
                        <div style={{ fontFamily: 'monospace' }}>{item.name}</div>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                                description={<div style={{ overflow: 'hidden', wordWrap: 'break-word' }}>{item.content}</div>}
                            />
                            <div style={{ color: 'gray' }}>{item.timeAdded.toLocaleString()}</div>
                        </List.Item>
                    </>
                )}
            />
        </Card>
    );
};

export default Announcements;
