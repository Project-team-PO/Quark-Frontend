import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { SignOut } from '../app/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { confirm } = Modal;

const LogoutModal: React.FC = (user: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
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
  const showPromiseConfirm = () => {
    confirm({
      title: languagePack?.Logout?.title,
      icon: <ExclamationCircleFilled />,
      content: languagePack?.Logout?.content,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch(SignOut({ ...user }));
            navigate("sign_in");
            resolve(undefined); // Resolve the promise after dispatch and navigate
          }, 1000);
        }).catch(() => {
          console.log('Oops errors!');
        });
      },
      onCancel() { },
    });
  };

  return (
    <Button onClick={showPromiseConfirm}>{languagePack.SignOut}</Button>
  )
};

export default LogoutModal;