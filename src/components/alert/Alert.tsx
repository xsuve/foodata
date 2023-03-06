import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import Text from '@/components/text/Text';

type AlertPropsType = 'success' | 'error' | 'warning' | 'info';
const AlertPropsTypeMap = {
  'success': {
    'icon':
      <div className='w-6 h-6 flex justify-center items-center shrink-0 rounded-full bg-green-100'>
        <CheckCircleIcon className='w-4 h-4 text-green-600' />
      </div>
  },
  'error': {
    'icon': 
      <div className='w-6 h-6 flex justify-center items-center shrink-0 rounded-full bg-red-100'>
        <XCircleIcon className='w-4 h-4 text-red-600' />
      </div>
  },
  'warning': {
    'icon': 
      <div className='w-6 h-6 flex justify-center items-center shrink-0 rounded-full bg-yellow-100'>
        <ExclamationCircleIcon className='w-4 h-4 text-yellow-600' />
      </div>
  },
  'info': {
    'icon': 
      <div className='w-6 h-6 flex justify-center items-center shrink-0 rounded-full bg-blue-100'>
        <InformationCircleIcon className='w-4 h-4 text-blue-600' />
      </div>
  }
};

export interface AlertProps {
  type: AlertPropsType;
  title: string;
  text: string;
  className?: string;
};

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  text,
  className = ''
}) => {
  return (
    <div className={`border border-slate-200 rounded p-4 bg-white ${className}`}>
      <div className='flex justify-start items-start gap-x-4'>
        {AlertPropsTypeMap[type].icon}
        <div className='flex flex-col gap-y-2 text-left'>
          <Text type='label' color='dark'>{title}</Text>
          <Text type='text' color='light' className='!text-xs block'>{text}</Text>
        </div>
      </div>
    </div>
  );
};

export default Alert;