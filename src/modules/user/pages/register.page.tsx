import { Helmet } from 'react-helmet-async';

import { useState } from 'react';
import { registrationTree } from '../workflow/register.workflow';
import { useTranslation } from 'react-i18next';
import { Button } from '@app/modules/common';
import { useNavigate } from 'react-router';
import { Role } from '@app/modules/common/constants/role.constants';

export type RegisterStateType = Partial<{ role: Role }>;

function RegisterTemplate() {
  const [registerState, setRegisterState] = useState<RegisterStateType>({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSetRegisterState = (newState: RegisterStateType) => {
    setRegisterState(newState);
  };

  const [currentNode, setCurrentNode] = useState(registrationTree);

  const handleNextStep = (choiceIndex: number) => {
    const nextNode = currentNode.children[choiceIndex];
    if (nextNode) {
      setCurrentNode(nextNode);
    }
  };

  const CurrentComponent = currentNode.component;

  return (
    <>
      <Helmet>
        <title>{t('Welcome to React')}</title>
      </Helmet>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Button type="submit" className="w-20 rounded-full mt-5 absolute left-5 top-5" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <CurrentComponent
          setRegisterState={handleSetRegisterState}
          registerState={registerState}
          onNext={(nextStep: number) => handleNextStep(nextStep)}
        />
        {/* <Input placeholder="email" type="email" />
        <Input placeholder="password" type="password" /> */}
        {/*     <SignUpButton /> */}
      </div>
    </>
  );
}

export default RegisterTemplate;
