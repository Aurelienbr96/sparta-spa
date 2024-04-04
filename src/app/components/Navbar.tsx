import { Link } from 'react-router-dom';
import { selectLoginIsSuccess, useLogoutMutation } from '@app/modules/user';
import { useTranslation } from '@app/modules/translation';
import { useSelector } from 'react-redux';

export function Navbar() {
  const loginSuccess = useSelector(selectLoginIsSuccess);
  const [logout] = useLogoutMutation();

  const { t } = useTranslation();

  return <div className="w-full bg-gray-800 text-gray-300"></div>;
}
