import React, { FC, useEffect, useState } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getProduct, getProductImage } from '@/services/supabase';
import Alert, { AlertProps } from '@/components/alert/Alert';

const ProductPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>();
  const [productImage, setProductImage] = useState('');
  useEffect(() => {
    const fetchProduct = async (id: string) => {
      const { data, error } = await getProduct(id);

      if (error) {
        return;
      }
  
      setProduct(data);
    };

    const fetchProductImage = async (id: string) => {
      const { data } = await getProductImage(id);

      if (!data) {
        return;
      }
  
      setProductImage(data.publicUrl);
    };

    if (params && params.id) {
      fetchProduct(params.id);
      fetchProductImage(params.id);
    }
  }, [params]);

  const [activeTab, setActiveTab] = useState('data');

  const [alert, setAlert] = useState<AlertProps>();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id: string) => {
    setLoading(true);

    const { error } = await deleteProduct(id);

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Delete product error.',
        text: error
      });
      return;
    }

    setLoading(false);
    navigate('/');
  };

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-y-1 mb-10'>
        <Button type='button' color='white' icon={<ArrowLeftIcon />} className='mb-4' onClick={() => navigate('/')} />
        <Text type='title' color='dark'>{product?.title}</Text>
        <div className='flex gap-x-2 mt-2'>
          <Text type='label' color='dark'>Code:</Text>
          <Text type='text' color='light'>{product?.code}</Text>
        </div>
        <div className='flex gap-x-2 mt-2'>
          <Text type='label' color='dark'>ID:</Text>
          <Text type='text' color='light'>{product?.id}</Text>
        </div>
      </div>
      <div>
        <div className='flex gap-x-6 border-b border-b-slate-200 pb-3'>
          <Text type='label' color={activeTab === 'data' ? 'dark' : 'light'} onClick={() => setActiveTab('data')}>Data</Text>
          <Text type='label' color={activeTab === 'process' ? 'dark' : 'light'} onClick={() => setActiveTab('process')}>Process</Text>
          <Text type='label' color={activeTab === 'actions' ? 'dark' : 'light'} onClick={() => setActiveTab('actions')}>Actions</Text>
        </div>

        <div className='mt-3'>
          <>
            { alert && !loading ? <Alert {...alert} className='mb-3' /> : null }
          </>

          <div className={activeTab === 'data' ? 'block' : 'hidden'}>
            //
          </div>
          <div className={activeTab === 'process' ? 'block' : 'hidden'}>
            <Text type='label' color='dark'>Nutritional info image</Text>
            <div className='w-full mt-2'>
              <img src={productImage} className='max-w-full' />
            </div>
          </div>
          <div className={`flex flex-col gap-y-6 ${activeTab === 'actions' ? 'block' : 'hidden'}`}>
            <div>
              <Text type='label' color='dark'>Change status to {product?.status === 'todo' ? 'Done' : 'Todo'}</Text>
              <Text type='text' color='light' className='mb-2'>Do you want to change the status for this product?</Text>
              <Button type='button' color='white'>Change to {product?.status === 'todo' ? 'Done' : 'Todo'}</Button>
            </div>
            <div>
              <Text type='label' color='dark'>Delete product</Text>
              <Text type='text' color='light' className='mb-2'>Do you want to delete this product?</Text>
              <Button type='button' color='red' onClick={() => handleDelete(product?.id)} loading={loading} disabled={loading}>Delete</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;