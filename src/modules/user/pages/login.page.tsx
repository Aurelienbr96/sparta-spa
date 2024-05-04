import { Button, ButtonProps, Input } from '@app/modules/common';
import { Helmet } from 'react-helmet-async';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validation/login.validation.schema';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation, useRegisterGoogleMutation } from '../redux';
import { ErrorMessage } from '@app/modules/common/components/text/ErrorMessage';

type FormValues = {
  email: string;
  password: string;
};

function LoginTemplate() {
  const [login, { error }] = useLoginMutation();

  const { t } = useTranslation();
  const [signUpByGoogle, { error: googleErrors }] = useRegisterGoogleMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => login(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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
          data-testid="login-page-email"
          label="email"
          name="email"
          required
          register={register}
          errors={errors}
          placeholder="Email"
          type="email"
          className="mt-20 w-96"
        />

        <Input
          data-testid="login-page-password"
          label="password"
          name="password"
          required
          errors={errors}
          register={register}
          autoComplete="current-password"
          placeholder="Password"
          type="password"
          className="mt-4 w-96"
        />

        <p className="mt-6">Forgot password ?</p>
        <LoginButton data-testid="login-page-submit" />
        {!!error && !Array.isArray(error) && (
          <ErrorMessage data-testid="login-error-message">{t(error.message as string)}</ErrorMessage>
        )}
        {googleErrors && <ErrorMessage>{t(googleErrors.message as string)}</ErrorMessage>}
        <Link to="register" data-testid="signup-page-link">
          Sign Up
        </Link>
        <GoogleLogin
          onSuccess={(credential) => {
            signUpByGoogle({
              googleCredential: {
                credential: credential.credential as string,
                clientId: credential.clientId as string,
                select_by: credential.select_by as string,
              },
            });
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

const LoginButton = (props: Omit<ButtonProps, 'children'>) => {
  return (
    <Button type="submit" className="w-96 mt-5" {...props}>
      Sign in with Email
    </Button>
  );
};

export default LoginTemplate;
