import { SubmitHandler, useForm } from 'react-hook-form';
import { registerValidationSchema } from '../validation/register.validation.schema';
import { Button, Input } from '@app/modules/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import { useRegisterGoogleMutation, useRegisterMutation } from '../redux';
import { RegisterStateType } from '../pages/register.page';

type FormValues = {
  email: string;
  password: string;
};

export const RegisterForm = ({ registerState }: { registerState?: RegisterStateType }) => {
  const [singUp, { error }] = useRegisterMutation();
  const [signUpByGoogle] = useRegisterGoogleMutation();

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
      <Input containerClassName="my-4" label="email" register={register} errors={errors} placeholder="email" type="email" />
      <Input label="password" register={register} errors={errors} placeholder="password" type="password" />
      <GoogleLogin
        onSuccess={(credential) => {
          signUpByGoogle(credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
      {!!error && Array.isArray(error) && error.map((err: string) => <p className="text-red-500">{err}</p>)}
      {!!error && !Array.isArray(error) && <p className="text-red-500">{error as string}</p>}
      <SignUpButton />
    </form>
  );
};

const SignUpButton = () => {
  return (
    <Button type="submit" className="w-96 mt-5">
      Sign in with Email
    </Button>
  );
};
