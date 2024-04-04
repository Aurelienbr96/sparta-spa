export type OnNext = (index: number) => void;

export const AskForClientWorkflow = ({ onNext }: { onNext: OnNext }) => (
  <div>
    Are you planning to use Sparta for personnal use? <button onClick={() => onNext(0)}>Yes</button> |{' '}
    <button onClick={() => onNext(1)}>No</button>
  </div>
);

export const StartComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    Are you an athlete or a coach ? <button onClick={() => onNext(0)}>Client</button> |{' '}
    <button onClick={() => onNext(1)}>Coach</button>
  </div>
);
export const CoachInfoComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    Coach Info: <button onClick={() => onNext(0)}>Next</button>
  </div>
);
export const ClientInfoComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    Client Info: <button onClick={() => onNext(0)}>Next</button>
  </div>
);

export const ClientHeightComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    What is your height ? <button onClick={() => onNext(0)}>Next</button>
  </div>
);

export const ClientWeightComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    What is your weight ? <button onClick={() => onNext(0)}>Next</button>
  </div>
);

export const ClientGenderComponent = ({ onNext }: { onNext: OnNext }) => (
  <div>
    What is your gender ? <button onClick={() => onNext(0)}>Next</button>
  </div>
);
export const EndComponent = () => <div>Registration Complete!</div>;
