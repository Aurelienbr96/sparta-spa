import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common';
import { useGetMuscleGroupsQuery } from '../common/redux/muscleGroup/muscle-group.api';
import { UserType, reset, selectLoginUser, useCreateFeralLinkMutation, useLogoutMutation } from '../user';
import { getEnv } from '../common/utils/env.utils';

const generateReferalUrl = (user: UserType) => {
  return `${getEnv('VITE_CLIENT_URL')}?referalCode=${user.referalCode}`;
};

const Dashboard = () => {
  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const response = useGetMuscleGroupsQuery('test');
  const user = useSelector(selectLoginUser);
  const [referalMutation] = useCreateFeralLinkMutation();
  const handleLogout = async () => {
    dispatch(reset());
    await logout(user.id);
  };
  const fereralUrl = generateReferalUrl(user);
  console.log('user', user, response);
  const handleCreateReferalLink = () => {
    referalMutation(user.id);
  };

  const handleToggleClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fereralUrl);
      console.log('Text copied to clipboard' + fereralUrl);
    } catch (err) {
      console.error('Failed to toggle clipboard content: ', err);
    }
  };

  return (
    <div>
      <div>
        <p>you are in a protected page</p>
        <Button onClick={handleLogout}>Logout</Button>
        {user.role === 'COACH' && (
          <>
            <Button className="mt-6" onClick={handleCreateReferalLink}>
              Create my referal link
            </Button>
            <p className="hover:cursor-pointer" onClick={handleToggleClipboard}>
              my referal link: {fereralUrl}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
