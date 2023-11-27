import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { SignOut } from '../app/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const LogoutModal: React.FC = (user: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const showPromiseConfirm = () => {
    confirm({
      title: 'Sign out action?',
      icon: <ExclamationCircleFilled />,
      content: 'Click ok to sign out',
      onOk() {
        return new Promise((resolve, reject) => {
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
    <Button onClick={showPromiseConfirm}>Sign Out</Button>
  )
};

export default LogoutModal;