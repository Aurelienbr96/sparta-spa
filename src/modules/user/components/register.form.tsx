import { SubmitHandler, useForm } from 'react-hook-form';
import { registerValidationSchema } from '../validation/register.validation.schema';
import { Button, ButtonProps, Input } from '@app/modules/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import { useRegisterGoogleMutation, useRegisterMutation } from '../redux';
import { RegisterStateType } from '../pages/register.page';
import { useTranslation } from 'react-i18next';

type FormValues = {
  email: string;
  password: string;
};

export const RegisterForm = ({ registerState }: { registerState: RegisterStateType }) => {
  const [singUp, { error }] = useRegisterMutation();
  const [signUpByGoogle] = useRegisterGoogleMutation();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    singUp({ ...data, ...registerState });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerValidationSchema),
  });
  return (
    <form
      className="flex flex-col items-center mt-4 lg:mt-0 justify-center w-full lg:mb-40"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-title-xl">Welcome to Sparta</h1>
      <Input
        data-testid="register-page-email"
        containerClassName="my-4"
        label="email"
        register={register}
        errors={errors}
        placeholder="email"
        type="email"
      />
      <Input
        data-testid="register-page-password"
        label="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="password"
      />
      <GoogleLogin
        onSuccess={(credential) => {
          signUpByGoogle({
            googleCredential: {
              clientId: credential.clientId as string,
              select_by: credential.select_by as string,
              credential: credential.credential as string,
            },
            // @ts-ignore
            state: registerState,
          });
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
      {!!error && Array.isArray(error) && error.map((err: string) => <p className="text-red-500">{err}</p>)}
      {!!error && !Array.isArray(error) && <p className="text-red-500">{t(error as string)}</p>}
      <SignUpButton data-testid="register-page-submit" />
    </form>
  );
};

const SignUpButton = (props: Omit<ButtonProps, 'children'>) => {
  return (
    <Button type="submit" className="w-96 mt-5" {...props}>
      Sign in with Email
    </Button>
  );
};
