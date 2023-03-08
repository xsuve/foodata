import React, { FC, useState } from 'react';
import Text from '@/components/text/Text';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { compressImage } from '@/utils/file';

interface FileInputProps {
  name: string;
  label?: string;
  text: string;
  register?: any;
  errors?: any;
  validation?: any;
  required?: boolean;
  onChange?: (imageBlob: Blob, imageName: string) => void;
  className?: string;
};

const FileInput: FC<FileInputProps> = ({
  name,
  label = undefined,
  text,
  register = undefined,
  errors = undefined,
  validation = undefined,
  required = false,
  onChange = undefined,
  className = ''
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: any) => {
    e?.stopPropagation();
    
    setLoading(true);
    
    if (onChange && e.target && e.target.files) {
      const compressedImage: any = await compressImage(e.target.files[0], {
        maxWidth: 500,
        maxHeight: 300,
        quality: 0.8,
        type: 'image/jpg'
      });
      
      if (!compressedImage) {
        console.log('Compress image error.');
        setLoading(false);
        return;
      }

      onChange(compressedImage, e.target.files[0]?.name);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setLoading(false);
    }
  };

  return (
    <div className={`text-left ${className}`}>
      { label ? <Text type='label' color='dark' className='block mb-2'>{label}</Text> : null }
      <div className='flex gap-x-4 items-center'>
        <div
          className={`flex justify-center items-center overflow-hidden relative rounded w-[45px] h-[45px] bg-white group border ${errors && errors[name] ? 'border-red-400 hover:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}
          style={previewImage ? {
            backgroundImage: `url('${previewImage}')`,
            backgroundSize: 'cover'
          } : {}}
          onChange={handleChange}
        >
          <input
            type='file'
            name={name}
            className='appearance-none absolute w-full h-full top-0 right-0 opacity-0'
            required={required}
            accept='image/*'
            {...register(name, validation)}
          />
          { !previewImage && !loading && <PlusIcon className='w-5 h-5 text-slate-700' /> }
          { !previewImage && loading && <ArrowPathIcon className='w-5 h-5 text-slate-700 animate-spin' /> }
        </div>
        <Text type='text' color='light'>{text}</Text>
      </div>
      { errors && errors[name]?.type === 'required' ? <Text type='text' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
    </div>
  );
};

export default FileInput;