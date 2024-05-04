import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common';
import { useCreateMuscleGroupMutation, useGetMuscleGroupsQuery } from '../common/redux/muscleGroup/muscle-group.api';
import { reset, selectLoginUser, useCreateFeralLinkMutation, useLogoutMutation } from '../user';
import { getEnv } from '../common/utils/env.utils';
import { UserDomainModel } from '@app/modules/user/user.domain-model';
import { selectFetchedMuscleGroups } from '../common/redux/muscleGroup/muscle-group.selector';
import { MuscleGroupApiModel } from '../muscle-group/muscle.api-model';
import { CreateMuscleGroupForm } from '../muscle-group/form/create-muscle-group.form';

const generateReferalUrl = (user: UserDomainModel.User) => {
  return `${getEnv('VITE_CLIENT_URL')}/referal?referalCode=${user.referalCode}`;
};

const Dashboard = () => {
  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();

  const { isLoading } = useGetMuscleGroupsQuery();
  const muscleGroups = useSelector(selectFetchedMuscleGroups);
  const [createMuscleGroup] = useCreateMuscleGroupMutation();
  const handleCreateMuscleGroup = (data: MuscleGroupApiModel.Create.Input) => createMuscleGroup(data);

  const user = useSelector(selectLoginUser);

  const [referalMutation] = useCreateFeralLinkMutation();
  const handleLogout = async () => {
    dispatch(reset());
    await logout(user.id);
  };
  const fereralUrl = generateReferalUrl(user);

  const handleCreateReferalLink = () => {
    referalMutation();
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
        <Button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </Button>
        <p>{user.role}</p>
        <p>{user.email}</p>

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
        <CreateMuscleGroupForm createMuscleGroup={handleCreateMuscleGroup} />
        {isLoading
          ? null
          : muscleGroups
          ? muscleGroups.map((musclegroup) => <p key={musclegroup.id}>{musclegroup.name}</p>)
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
