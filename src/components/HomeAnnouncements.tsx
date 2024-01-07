import React, { useState, useEffect } from 'react';
import { Card, List, Avatar, Form, Input, Button, Modal, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { FormatDate } from '../shared/functions';

import styles from "../styles/Pages/UserSearch.module.css";

interface Announcement {
	id: number;
	title: string;
	content: string;
	name: string;
	avatar: string;
	time: Date;
}

const Announcements: React.FC = () => {
	const [announcements, setAnnouncements] = useState<Announcement[]>([
		{ id: 1, title: 'Announcement #1', content: 'This is an example.', name: 'John Doe', avatar: 'https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=400&d=robohash&r=x', time: new Date() },
	]);
	const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
	const [languagePack, setLanguagePack] = useState<any>("");

	useEffect(() => {
		const fetchLanguagePack = async () => {
			try {
				let pack = await import(`../assets/translations/${language}.json`);
				setLanguagePack(pack);
			} catch (error) {
				console.error(`Failed to load language pack for ${language}`, error);
			}
		};

		fetchLanguagePack();
	}, [language]);
	const [form] = Form.useForm();
	const [showModal, setShowModal] = useState(false);

	const { userState } = useSelector((state: any) => state.auth);
	const { user } = userState;

	const handleAddAnnouncement = () => {
		form.validateFields().then((values) => {
			values["date"] = FormatDate(values.date); // Change the default DatePicker format
			const newAnnouncement: Announcement = {
				id: announcements.length + 1,
				title: values.title,
				content: values.content,
				name: `${user.firstName} ${user.lastName}`,
				avatar: user.pictureUrl,
				time: values.date
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
				title={languagePack?.Announcement?.AddAnnouncement}
				visible={showModal}
				onCancel={() => setShowModal(false)}
				onOk={handleAddAnnouncement}
			>
				<Form form={form}>
					<Form.Item name="title" rules={[{ required: true, message: `${languagePack?.Announcement?.titleMessage}` }]}>
						<Input placeholder={languagePack?.Announcement?.title} />
					</Form.Item>
					<Form.Item name="content" rules={[{ required: true, message: `${languagePack?.Announcement?.contentMessage}` }]}>
						<Input.TextArea placeholder={languagePack?.Announcement?.content} />
					</Form.Item>
					<Form.Item name="time" rules={[{ required: true, message: `${languagePack?.Announcement?.selectDateMessage}` }]}>
						<DatePicker placeholder={languagePack?.Announcement?.selectDate} />
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

							{new Date(item.time) < new Date() ?
								<div style={{ color: 'red', fontWeight: "bold" }}>{item.time.toLocaleString()}</div>
								:
								<div style={{ color: 'green', fontWeight: "bold" }}>{item.time.toLocaleString()}</div>}
						</List.Item>
					</>
				)}
			/>
		</Card>
	);
};

export default Announcements;
