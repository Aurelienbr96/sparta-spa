import { Button, Input } from '@app/modules/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FormValues = {
  name: string;
  description: string;
};

export const registerValidationSchema = yup
  .object({
    name: yup.string().required('name is required'),
    description: yup.string().required('description is required'),
  })
  .required();

export const CreateMuscleGroupForm = ({ createMuscleGroup }: { createMuscleGroup: (data: FormValues) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerValidationSchema),
  });

  return (
    <form onSubmit={handleSubmit(createMuscleGroup)}>
      <h1>CREATE MUSCLE GROUP</h1>
      <Input
        data-testid="muscle-group-name-input"
        containerClassName="my-4"
        label="name"
        register={register}
        errors={errors}
        placeholder="name"
        type="name"
      />
      <Input
        data-testid="muscle-group-description-input"
        containerClassName="my-4"
        label="description"
        register={register}
        errors={errors}
        placeholder="description"
        type="description"
      />
      <Button type="submit" data-testid="muscle-group-submit">
        Create a new muscle group
      </Button>
    </form>
  );
};
