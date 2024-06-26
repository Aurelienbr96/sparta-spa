import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingTemplate } from '@app/modules/common';
import { selectLoginIsSuccess } from '@app/modules/user';

type Props = {
  children: JSX.Element;
};

export function UnAuthGuard(props: Props) {
  const loginSuccess = useSelector(selectLoginIsSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) navigate('/dashboard');
  }, [loginSuccess]);

  return loginSuccess ? <LoadingTemplate /> : props.children;
}
