import React, { FC } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductBox from '@/components/product-box/ProductBox';

const Home: FC = () => {
  const navigate = useNavigate();

  const products = useProducts();
  console.log(products);
  

  return (
    <div className='p-6'>
      <div className='flex gap-x-10 mb-10'>
        <div className='flex flex-col gap-y-1'>
          <Text type='title' color='dark'>Welcome!</Text>
          <Text type='text' color='light'>Below are the recently added products.</Text>
        </div>
        <Button type='button' color='blue' icon={<PlusIcon />} className='shrink-0' onClick={() => navigate('/scan')} />
      </div>
      <div>
        <Text type='label' color='dark'>Recently added</Text>
        <div className='flex flex-col gap-y-2 mt-2'>
          { products && products.length > 0
          ? products?.map((product: any, index) => <ProductBox key={index} data={product} />)
          :
          <Text type='text' color='light'>No products added yet.</Text>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;