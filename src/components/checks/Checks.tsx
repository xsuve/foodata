import React, { FC, useState, FormEvent } from 'react';
import { useController } from 'react-hook-form';
import Text from '@/components/text/Text';

export type ChecksPropsOption = {
  label: string;
  value: string;
  checked: boolean;
};

interface ChecksProps {
  name: string;
  label?: string;
  register?: any;
  errors?: any;
  validation?: any;
  options: ChecksPropsOption[];
  onChange?: (value: string) => void;
  className?: string;
};

const Checks: FC<ChecksProps> = ({
  name,
  label = undefined,
  register = undefined,
  errors = undefined,
  validation = undefined,
  options,
  onChange,
  className = ''
}) => {
  const handleChange = (e: any) => {
    if (onChange && e.target) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      { label ? <Text type='label' color='dark' className='block mb-2'>{label}</Text> : null }
      <div className={`flex gap-2 overflow-x-auto ${className}`} onChange={handleChange}>
        {options.map((option, index) => (
          <div key={index} className='relative overflow-hidden shrink-0'>
            <input
              type='radio'
              name={name}
              checked={option.checked}
              className='appearance-none absolute top-0 left-0 w-full h-full'
              value={option.value}
              {...register(name, validation)}
            />
            <div
              className={`flex justify-center items-center rounded h-[45px] px-4 cursor-pointer ${option.checked ? 'bg-blue-500 border border-blue-500' : 'bg-white border border-slate-200'}`}
            >
              <Text type='label' color={option.checked ? 'white' : 'dark'}>{option.label}</Text>
            </div>
          </div>
        ))}
        { errors && errors[name]?.type === 'required' ? <Text type='text' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      </div>
    </div>
  );
};

export default Checks;