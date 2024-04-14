import { RegisterStateType } from '../pages/register.page';
import { ButtonProps } from '@app/modules/common';

export type OnNext = (index: number) => void;

const CardButton = ({ children, className, onClick, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`h-20 w-40 rounded-lg border-[1px] border-black ${className}`} {...props}>
      {children}
    </button>
  );
};

export const AthleteOrCoachComponent = ({
  onNext,
  setRegisterState,
}: {
  onNext: OnNext;
  registerState: RegisterStateType;
  setRegisterState: (newState: RegisterStateType) => void;
}) => (
  <div className="flex flex-col items-center">
    <p>Are you an athlete or a coach ?</p>
    <div className="flex items-center mt-4 group">
      <CardButton
        data-testid="client-role-card-button"
        onClick={() => {
          setRegisterState({ role: 'USER' });
          onNext(0);
        }}
      >
        Athlete
      </CardButton>{' '}
      <span className="mx-4">-</span>{' '}
      <CardButton
        data-testid="coach-role-card-button"
        onClick={() => {
          setRegisterState({ role: 'COACH' });
          onNext(1);
        }}
      >
        Coach
      </CardButton>
    </div>
  </div>
);
