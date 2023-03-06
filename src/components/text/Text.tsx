import React, { FC, ReactNode } from 'react';

type TextPropsType = 'title' | 'label' | 'text';
const TextPropsTypeMap = {
  'title': 'font-space-grotesk text-3xl font-medium',
  'label': 'font-space-grotesk text-sm font-medium',
  'text': 'font-poppins text-sm font-light'
};

type TextPropsColor = 'dark' | 'light' | 'white' | 'red' | 'green' | 'yellow';
const TextPropsColorMap = {
  'dark': 'text-slate-700',
  'light': 'text-slate-400',
  'white': 'text-white',
  'red': 'text-red-400',
  'green': 'text-green-400',
  'yellow': 'text-yellow-500'
};

interface TextProps {
  type: TextPropsType;
  color: TextPropsColor;
  children: ReactNode;
  className?: string;
};

const Text: FC<TextProps> = ({
  type,
  color,
  children,
  className = ''
}) => {
  return (
    <div className={`inline-block ${TextPropsTypeMap[type]} ${TextPropsColorMap[color]} ${className}`}>{children}</div>
  );
};

export default Text;