import { FC } from 'react';

import clsx from 'clsx';

type InputProps = {
  value: string;
  id: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'number';
  label: string;
  error?: string | null;
};

export const TextInput: FC<InputProps> = ({
  value,
  id,
  name,
  placeholder,
  type = 'text',
  label,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={id} className="text-xl font-semibold">
        {label}
      </label>
      <input
        defaultValue={value}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        className={clsx('px-3 py-2 border rounded hover:bg-gray-100 ', {
          'border-red-600': error,
          'border-gray-200': !error,
        })}
      />
    </div>
  );
};
