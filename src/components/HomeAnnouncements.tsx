import React, { useState, useEffect, useRef } from 'react';
import { Card, Avatar, Form, Input, Button, Modal, DatePicker, Pagination, Tooltip, message, Tour } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Announcement, AnnouncementResponse } from '../ts/interfaces';
import styles from "../styles/Components/Announcements.module.css";
import { addAnnouncement, setAnnouncements, deleteAnnouncement } from '../app/slices/announcement.slice';
import { useAddAnnouncementEndpointMutation, useGetAnnouncementsEndpointMutation, useDeleteAnnouncementEndpointMutation } from '../app/slices/auth.api.slice';
import type { TourProps } from 'antd';
import { setOpenModalAnnouncements } from '../app/slices/tour.slice';


const Announcements: React.FC = () => {
	const [form] = Form.useForm();
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	dayjs.extend(customParseFormat);
	const dispatch = useDispatch();
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);

	const open = useSelector((state: any) => state.tour.openModalAnnouncements)
	const steps: TourProps['steps'] = [
		{
			title: 'Announcement',
			description: 'here you can see example Announcement, from top title, name and photo(of creator), content and date(of happening).',
			target: () => ref1.current,
		},
		{
			title: 'Add announcements',
			description: 'Here you can add your announcement.',
			target: () => ref2.current,
		},
		{
			title: 'Pagination',
			description: 'Here you can change pages.',
			target: () => ref3.current,
		}
	];
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

	const [AddAnnouncementEndpoint] = useAddAnnouncementEndpointMutation(); // Error alert/message if adding fails
	const [GetAnnouncementEndpoint] = useGetAnnouncementsEndpointMutation(); //Skeleton if the data is loading
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
			<Button ref={ref2} type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setShowModal(true)} style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
			<Modal
				title={languagePack?.Announcement?.AddAnnouncement}
				open={showModal}
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
					<Form.Item name="date" rules={[{ required: true, message: `${languagePack?.Announcement?.selectDateMessage}` }]}>
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
				title={languagePack?.Announcement?.confirmDelete}
				open={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
				onOk={confirmDeleteAnnouncement}
			>
				{languagePack?.Announcement?.confirmDeleteMessage}
			</Modal>
			<div className={styles.announcement_card_container} >
				{currentAnnouncements.map((item: AnnouncementResponse) => (

					<Card
						ref={ref1}
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
			<div ref={ref3}>
				<Pagination

					style={{ marginTop: '16px', textAlign: 'center' }}
					total={announcements.length}
					pageSize={itemsPerPage}
					current={currentPage}
					onChange={handlePageChange}
				/></div>
			<Tour open={open} onClose={() => dispatch(setOpenModalAnnouncements())} steps={steps} />
		</Card>
	);
};

export default Announcements;