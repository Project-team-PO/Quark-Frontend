import { useState } from 'react';
import { Modal } from 'antd';
import { Avatar, Tooltip, Divider } from 'antd';
import { useSelector } from 'react-redux';
import LogoutModal from './LogoutModal';
import React from 'react';

const UserProfile = () => {
	const [visible, setVisible] = useState(false);

	const handleOpenModal = () => {
		setVisible(true);
	};

	const handleCloseModal = () => {
		setVisible(false);
	};

	const { userState } = useSelector((state: any) => state.auth);
	const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
	const [languagePack, setLanguagePack] = useState<any>("");

	React.useEffect(() => {
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
	return (
		<div>
			<Tooltip title={languagePack.UserProfile} >
				<Avatar onClick={handleOpenModal} size="large" src={userState.user.pictureUrl} style={{ marginRight: '16px' }} />
				<span onClick={handleOpenModal} style={{ fontSize: '18px', fontWeight: 'bold' }}>
					{userState.user.firstName} {userState.user.lastName}
				</span>
			</Tooltip>
			<Modal
				title={languagePack.UserProfile}
				visible={visible}
				onCancel={handleCloseModal}
				footer={null}
			>
				<div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
					<div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
						<Avatar style={{ height: '140px', width: '140px' }} src={userState.user.pictureUrl} />
					</div>
					<div>
						<p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{languagePack.Username}: {userState.user.username}</p>
						<p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{languagePack.Name}: {userState.user.firstName} {userState.user.lastName}</p>
						<p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{languagePack.Email}: {userState.user.email}</p>
						<p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{languagePack.Department}: </p>
						<p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{languagePack.Position}: </p>
					</div>
				</div>
				<Divider />
				<div style={{ marginTop: '16px' }}>
					<h3 style={{ fontWeight: 'bold' }}>{languagePack.Summary}: {userState.user.selfDescription}</h3>
					<p style={{ margin: '16px 0' }}></p>
					<LogoutModal {...userState} />
				</div>
			</Modal>
		</div>
	);
};

export default UserProfile;
