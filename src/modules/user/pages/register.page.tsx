import { Helmet } from 'react-helmet-async';

import { useRegisterMutation } from '../redux';
import { useState } from 'react';
import { registrationTree } from '../workflow/register.workflow';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@app/modules/common';
import { useNavigate } from 'react-router';

function RegisterTemplate() {
  const [register] = useRegisterMutation();

  const onSubmit = ({ password2, ...values }: FormValues) => {
    register(values);
  };

  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <Button type="submit" className="w-96 mt-5" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <CurrentComponent onNext={(nextStep: number) => handleNextStep(nextStep)} />
        <Input placeholder="email" type="email" />
        <Input placeholder="password" type="password" />
        <SignUpButton />
      </div>
    </>
  );
}

const SignUpButton = () => {
  return (
    <Button type="submit" className="w-96 mt-5">
      Sign in with Email
    </Button>
  );
};

export type FormValues = {
  email: string;
  username: string;
  password: string;
  password2: string;
  firstname: string;
  lastname: string;
};

const initialValues: FormValues = {
  email: '',
  username: '',
  password: '',
  password2: '',
  firstname: '',
  lastname: '',
};

export default RegisterTemplate;
