// import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Input } from '@app/modules/common';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//import { Alert, Button, Card, Form } from 'react-breeze';
// import { FormValidationUtils } from '@app/modules/common';

// import { useLoginMutation } from '../redux';

/* type FormValues = {
  email: string;
  password: string;
};
 */

function LoginTemplate() {
  // const [login] = useLoginMutation();

  // const onSubmit = (values: FormValues) => login(values);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('app.page.login.title')}</title>
      </Helmet>
      <div className="flex flex-col items-center mt-4 lg:mt-0 justify-center w-full lg:mb-40">
        <p className="text-title-2xl font-bold">{t('app.page.login.title')}</p>
        <Input placeholder="Email" type="email" className="mt-20 w-96" />
        <Input placeholder="Password" type="password" className="mt-4 w-96" />
        <p className="mt-6">Forgot password ?</p>
        <LoginButton />
        <Link to="register">Sign Up</Link>
      </div>
    </>
  );
}

const LoginButton = () => {
  return (
    <Button type="submit" className="w-96 mt-5">
      Sign in with Email
    </Button>
  );
};

export default LoginTemplate;
