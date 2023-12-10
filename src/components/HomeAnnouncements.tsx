import React, { useState, useEffect } from 'react';
import { Card, Avatar, Form, Input, Button, Modal, DatePicker, Pagination, Tooltip, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from "../styles/Components/Announcements.module.css";
import { addAnnouncement, setAnnouncements, deleteAnnouncement } from '../app/slices/announcement.slice';
import { useAddAnnouncementEndpointMutation, useGetAnnouncementsEndpointMutation, useDeleteAnnouncementEndpointMutation } from '../app/slices/auth.api.slice';

interface Announcement {
	title: string;
	content: string;
	email: string;
	time: string;
}

interface AnnouncementResponse {
	id: number;
	title: string;
	content: string;
	time: string;
	userFirstName: string;
	userLastName: string;
	userPictureUrl: string;
}

const Announcements: React.FC = () => {
	const [form] = Form.useForm();
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	dayjs.extend(customParseFormat);
	const dispatch = useDispatch();

	const [AddAnnouncementEndpoint, { isError }] = useAddAnnouncementEndpointMutation(); // Error alert/message if adding fails
	const [GetAnnouncementEndpoint, { isLoading }] = useGetAnnouncementsEndpointMutation(); //Skeleton if the data is loading
	const [DeleteAnnouncementEndpoint] = useDeleteAnnouncementEndpointMutation(); // Delete announcement endpoint

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await GetAnnouncementEndpoint(undefined).unwrap();
				dispatch(setAnnouncements(response));
			} catch (error) {
				console.error(error);
			}
		};
		fetchAnnouncements();
	}, []);

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

			await AddAnnouncementEndpoint(newAnnouncement).unwrap().then(() => {
				dispatch(addAnnouncement(newAnnouncement));
				form.resetFields();
				setShowModal(false);

				message.success('Announcement added successfully');
			}).catch((e) => {
				message.error('Failed to add announcement' + e);
			});
		});
	};

	const handleDeleteAnnouncement = async (id: number) => {
		setDeleteAnnouncementId(id);
		setShowDeleteModal(true);
	};

	const confirmDeleteAnnouncement = async () => {
		if (deleteAnnouncementId) {
			const Announcement = {
				id: deleteAnnouncementId,
				email: user.email
			};
			await DeleteAnnouncementEndpoint(Announcement).unwrap().then(() => {
				dispatch(deleteAnnouncement(deleteAnnouncementId));
				setShowDeleteModal(false);
				message.success('Announcement deleted successfully');
			}).catch(() => {
				message.error('Failed to delete announcement');
			});
		}
	};

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
			<Modal
				title="Confirm Delete"
				open={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
				onOk={confirmDeleteAnnouncement}
			>
				Are you sure you want to delete this announcement?
			</Modal>
			<div className={styles.announcement_card_container}>
				{currentAnnouncements.map((item: AnnouncementResponse) => (

					<Card
						key={item.id}
						title={<Tooltip title={item.title} placement="top" ><h3 style={{ fontFamily: "Montserrat" }}>{item.title}</h3></Tooltip>}
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
								{user.firstName === item.userFirstName && (
									<Button style={{ position: 'absolute', marginTop: '8px', bottom: 10, right: 10 }} type="default" onClick={() => handleDeleteAnnouncement(item.id)}>Delete</Button>
								)}
							</div>
						</div>
					</Card>

				))}
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