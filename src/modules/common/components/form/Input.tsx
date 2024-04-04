import { InputHTMLAttributes } from 'react';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={'rounded-lg p-4 border-[1px] border-light-gray ' + className} {...props} />
);
