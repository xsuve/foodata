import React, { FC, useEffect, useState } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '@/services/supabase';

const ProductPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>();
  useEffect(() => {
    const fetchProduct = async (id: string) => {
      const { data, error } = await getProduct(id);      

      if (error) {
        return;
      }
  
      setProduct(data);
    };

    if (params && params.id) {
      fetchProduct(params.id);
    }
  }, [params]);

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-y-1 mb-10'>
        <Button type='button' color='white' icon={<ArrowLeftIcon />} className='mb-4' onClick={() => navigate('/')} />
        <Text type='title' color='dark'>{product?.title}</Text>
        <div className='flex gap-x-2 mt-2'>
          <Text type='label' color='dark'>Code:</Text>
          <Text type='text' color='light'>{product?.code}</Text>
        </div>
      </div>
      <div>
        <Text type='label' color='dark'>Data</Text>
      </div>
    </div>
  );
};

export default ProductPage;