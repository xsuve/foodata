import React, { cloneElement, FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; 

type ButtonPropsType = 'submit' | 'button';

type ButtonPropsColor = 'blue' | 'white';
const ButtonPropsColorMap = {
  'blue': 'bg-blue-500 text-white',
  'white': 'bg-white text-blue-500'
};
const ButtonIconPropsColorMap = {
  'blue': 'text-white',
  'white': 'text-blue-500'
};

interface ButtonProps {
  type: ButtonPropsType;
  color: ButtonPropsColor;
  children?: JSX.Element | string;
  icon?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  color,
  children = null,
  icon = null,
  loading = false,
  disabled = false,
  onClick = undefined,
  className = ''
}) => {
  let _icon = null;
  if (icon) {
    _icon = cloneElement(icon, {
      className: `w-5 h-5 ${ButtonIconPropsColorMap[color]} leading-none`
    });
  }

  return (
    <button
      type={type}
      className={`flex flex-row items-center justify-center ${(icon && !children) ? 'rounded-full w-10 h-10' : 'rounded h-10 px-5'} ${ButtonPropsColorMap[color]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      { (icon && !children) && _icon }
      { loading && <ArrowPathIcon className={`rounded-full w-10 h-10 ${ButtonIconPropsColorMap[color]} leading-none animate-spin`} /> }
      { children && <span className={`font-space-grotesk font-medium text-sm`}>{children}</span> }
    </button>
  );
};

export default Button;