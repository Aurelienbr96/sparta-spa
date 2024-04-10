// import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Input } from '@app/modules/common';
import { Helmet } from 'react-helmet-async';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validation/login.validation.schema';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation, useRegisterGoogleMutation } from '../redux';

//import { Alert, Button, Card, Form } from 'react-breeze';
// import { FormValidationUtils } from '@app/modules/common';

type FormValues = {
  email: string;
  password: string;
};

function LoginTemplate() {
  const [login] = useLoginMutation();

  const { t } = useTranslation();
  const [signUpByGoogle] = useRegisterGoogleMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => login(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: 'aurelienbrachet123@gmail.com',
      password: 'password12345',
    },
    resolver: yupResolver(loginValidationSchema),
  });

  return (
    <>
      <Helmet>
        <title>{t('app.page.login.title')}</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-4 lg:mt-0 justify-center w-full lg:mb-40"
      >
        <p className="text-title-2xl font-bold">{t('app.page.login.title')}</p>
        <Input
          label="email"
          required
          register={register}
          errors={errors}
          placeholder="Email"
          type="email"
          className="mt-20 w-96"
        />

        <Input
          label="password"
          required
          errors={errors}
          register={register}
          autoComplete="current-password"
          placeholder="Password"
          type="password"
          className="mt-4 w-96"
        />

        <p className="mt-6">Forgot password ?</p>
        <LoginButton />
        <Link to="register">Sign Up</Link>
        <GoogleLogin
          onSuccess={(credential) => {
            signUpByGoogle(credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </form>
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
