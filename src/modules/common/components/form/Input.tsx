import { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputProps<TFieldValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  label: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  required?: string | boolean | undefined;
  errors: FieldErrors<TFieldValues>;
  containerClassName?: string;
};

export const Input = <TFieldValues extends FieldValues>({
  className,
  register,
  label,
  required,
  type = 'text',
  errors,
  containerClassName,
  ...props
}: InputProps<TFieldValues>) => (
  <div className={containerClassName}>
    <input
      {...props}
      type={type}
      {...register(label, { required })}
      className={`w-96 rounded-lg p-4 border-[1px] border-light-gray ${className}`}
    />
    {errors[label]?.message && <p className="text-red-500">{errors[label]?.message as string}</p>}
  </div>
);
