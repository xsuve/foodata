import { Product } from '@/typings';
import React, { FC } from 'react';
import Text from '@/components/text/Text';
import { Link } from 'react-router-dom';

interface ProductProps {
  className?: string;
  data: Product;
};

const ProductBox: FC<ProductProps> = ({
  className = '',
  data
}) => {
  return (
    <Link to={`/product/${data.id}`}>
      <div className={`bg-white border border-slate-200 rounded p-6 ${className}`}>
        <div className={`w-fit px-[9px] py-[5px] rounded-xl text-[10px] leading-none uppercase font-poppins font-medium ${data.status === 'todo' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-500'}`}>
          {data.status}
        </div>
        <div className='flex flex-col mt-3'>
          <Text type='title' color='dark' className='!text-xl mb-1'>{data.title}</Text>
          <Text type='text' color='light' className='!text-xs tracking-widest'>{data.code}</Text>
        </div>
      </div>
    </Link>
  );
};

export default ProductBox;