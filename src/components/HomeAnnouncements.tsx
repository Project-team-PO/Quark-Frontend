import React, { useState, useEffect } from 'react';
import { Card, Avatar, Form, Input, Button, Modal, DatePicker, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { FormatDate } from '../shared/functions';
import { Announcement, AnnouncementResponse } from '../ts/interfaces';

import styles from "../styles/Pages/UserSearch.module.css";
import { addAnnouncement, setAnnouncements } from '../app/slices/announcement.slice';
import { useAddAnnouncementEndpointMutation, useGetAnnouncementsEndpointMutation } from '../app/slices/auth.api.slice';


const Announcements: React.FC = () => {
	const [form] = Form.useForm();
	const [showModal, setShowModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	dayjs.extend(customParseFormat);
	const dispatch = useDispatch();

	const [AddAnnouncementEndpoint, { isError }] = useAddAnnouncementEndpointMutation(); // Error alert/message if adding fails
	const [GetAnnouncementEndpoint, { isLoading }] = useGetAnnouncementsEndpointMutation(); //Skeleton if the data is loading

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await GetAnnouncementEndpoint(undefined).unwrap();
				dispatch(setAnnouncements(response));
			} catch (error) {
				console.error(error)
			}
		}
		fetchAnnouncements();
	}, [])

	const { announcements } = useSelector((state: any) => state.announcement);
	const { userState } = useSelector((state: any) => state.auth);
	const { user } = userState;
	const indexOfLastAnnouncement = currentPage * itemsPerPage;
	const indexOfFirstAnnouncement = indexOfLastAnnouncement - itemsPerPage;
	const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

	const handleAddAnnouncement = () => {
		form.validateFields().then(async (values) => {
			values["date1"] = dayjs(values.date[0]).format('YYYY-MM-DD HH:mm');
			values["date2"] = dayjs(values.date[1]).format('YYYY-MM-DD HH:mm');
			const date = values.date1 + " - " + values.date2;

			const newAnnouncement: Announcement = {
				title: values.title,
				content: values.content,
				time: date,
				email: user.email
			};

			const response = await AddAnnouncementEndpoint(newAnnouncement).unwrap();
			dispatch(addAnnouncement(response));
			form.resetFields();
			setShowModal(false);
		});
	};
	const handleDeleteAnnouncement = async (id: number) => {

	}
	const disabledDate: RangePickerProps['disabledDate'] = (current) => {
		// Can not select days before today and today
		return current && current < dayjs().endOf('day');
	};
	return (
		<Card className={styles.announcement_first_container} style={{ background: '#FFFFFF', padding: '24px', minHeight: '360px' }}>
			<Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setShowModal(true)} style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
			<Modal
				title="Add Announcement"
				open={showModal}
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
					<Form.Item name="date" rules={[{ required: true, message: 'Please select the date' }]}>
						<DatePicker.RangePicker
							disabledDate={disabledDate}
							showTime={{
								hideDisabledOptions: true,
								defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
							}}
							format="YYYY-MM-DD HH:mm"
						/>
					</Form.Item>
				</Form>
			</Modal>
			<div className={styles.announcement_grid}>
				<div className={styles.announcement_card_container}>
					{currentAnnouncements.map((item: AnnouncementResponse) => (
						<Card
							key={item.id}
							title={<div style={{ fontFamily: "Montserrat", fontSize: '22px' }}>{item.title}</div>}
							extra={
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ fontFamily: 'monospace' }}>{item.userFirstName} {item.userLastName}</div>
									<Avatar style={{ height: '3dvh', width: '3dvh', margin: '7px 0 7px 17px' }} src={item.userPictureUrl} />
								</div>
							}
							className={styles.announcement_card}
						>
							<div style={{ fontFamily: "Montserrat", textAlign: 'left', height: '100%', marginBottom: '15px' }}>
								<div style={{ wordWrap: 'break-word' }}>{item.content}</div>
								<div style={{ position: 'absolute', bottom: 10, textAlign: 'left', color: new Date(item.time) < new Date() ? 'red' : 'green', fontWeight: 'bold' }}>{item.time}</div>
								<div>
									<Button style={{ position: 'absolute', marginTop: '8px', bottom: 10, right: 10 }} type="default" onClick={() => handleDeleteAnnouncement(item.id)}>Delete</Button>
								</div>
							</div>



						</Card>
					))}
				</div>
			</div>
			<Pagination
				style={{ marginTop: '16px', textAlign: 'center' }}
				total={announcements.length}
				pageSize={itemsPerPage}
				current={currentPage}
				onChange={handlePageChange}
			/>
		</Card>
	);
};

export default Announcements;