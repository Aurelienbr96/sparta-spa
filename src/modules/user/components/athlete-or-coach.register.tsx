import { MouseEventHandler } from 'react';
import { RegisterStateType } from '../pages/register.page';
import { Role } from '@app/modules/common/constants/role.constants';

export type OnNext = (index: number) => void;

const CardButton = ({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={onClick} className={`h-20 w-40 rounded-lg border-[1px] border-black ${className}`}>
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
        onClick={() => {
          setRegisterState({ role: 'CLIENT' as Role });
          onNext(0);
        }}
      >
        Athlete
      </CardButton>{' '}
      <span className="mx-4">-</span>{' '}
      <CardButton
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
