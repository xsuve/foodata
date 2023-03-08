import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import Text from '@/components/text/Text';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import Button from '@/components/button/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import Alert, { AlertProps } from '@/components/alert/Alert';
import Input from '@/components/input/Input';
import { addProduct, getProductByCode } from '@/services/supabase';
import { useMarkets } from '@/hooks/useMarkets';
import { useTypes } from '@/hooks/useTypes';
import Checks from '@/components/checks/Checks';
import FileInput from '@/components/file-input/FileInput';

type AddData = {
  typeId: string;
  title: string;
  netWeightValue: number;
  netWeightUnit: string;
  marketId: string;
  price: number | null;
};

const Add: FC = () => {
  const markets = useMarkets();
  const types = useTypes();
  
  const navigate = useNavigate();
  const { state } = useLocation();

  const [alert, setAlert] = useState<AlertProps>();

  const [productByCode, setProductByCode] = useState<any>();
  const checkExists = async (code: number) => {
    const productResult = await getProductByCode(code);    
    
    if (productResult?.error) {
      return;
    }

    setProductByCode(productResult?.data);
  };
  useEffect(() => {
    if (!state?.code) {
      return;
    }    

    checkExists(parseInt(state.code));
  }, [state?.code]);

  const [loading, setLoading] = useState<boolean>(false);

  const [imageBlob, setImageBlob] = useState<any>();
  const [fileInputText, setFileInputText] = useState('');

  const [checkedMarket, setCheckedMarket] = useState('');
  const [checkedType, setCheckedType] = useState('');
  const [checkedNetWeightUnit, setCheckedNetWeightUnit] = useState('g');
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddData>({ mode: 'onChange' });

  const submitAdd = async (addData: AddData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    
    setLoading(true);
    const { error } = await addProduct({
      code: state.code,
      status: 'todo',
      typeId: addData.typeId,
      title: addData.title,
      netWeightValue: addData.netWeightValue,
      netWeightUnit: addData.netWeightUnit,
      marketId: addData.marketId,
      price: addData.price || null
    }, imageBlob);

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Add product error.',
        text: error
      });
      return;
    }

    setLoading(false);
    navigate('/');
    reset();
  };

  return (
    <>
      { state && state.code ?
        <div className='p-6'>
          <div className='flex flex-col gap-y-1 mb-10'>
            <Button type='button' color='white' icon={<ArrowLeftIcon />} className='mb-4' onClick={() => navigate('/')} />
            <Text type='title' color='dark'>Add product</Text>
            <Text type='text' color='light'>Save the scanned code into the database.</Text>
            <div className='flex gap-x-2 mt-6'>
              <Text type='label' color='dark'>Code:</Text>
              <Text type='text' color='light'>{state.code}</Text>
            </div>
          </div>
          <div>
            { productByCode
            ?
              <div className='flex flex-col gap-y-2'>
                <Text type='text' color='light'>A product with this code already exists:</Text>
                <div className='flex justify-between items-center'>
                  <Link to={`/product/${productByCode.id}`}>
                    <Text type='label' color='dark' className='!text-base'>{productByCode.title}</Text>
                  </Link>
                  <Text type='text' color='light'>{DateTime.fromISO(productByCode.createdAt).toFormat('MMMM dd, yyyy')}</Text>
                </div>
              </div>
            :
              <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitAdd)} autoComplete='off' noValidate>
                <div className='w-full flex flex-col gap-y-6'>
                  <FileInput
                    name='images'
                    label='Image'
                    text={fileInputText !== '' ? (fileInputText.length > 30 ? fileInputText.substring(0, 30) + '...' : fileInputText) : 'Nutritional info image'}
                    errors={errors}
                    register={register}
                    validation={{
                      required: 'This field is required.',
                    }}
                    onChange={(imageBlob, imageName) => {
                      setImageBlob(imageBlob);
                      setFileInputText(imageName);
                    }}
                  />
                  <Checks
                    label='Market'
                    name='marketId'
                    errors={errors}
                    register={register}
                    validation={{
                      required: 'This field is required.',
                    }}
                    options={markets?.map(market => ({ label: market.name, value: market.id, checked: checkedMarket === market.id })) || []}
                    onChange={(value) => {
                      setCheckedMarket(value);
                    }}
                  />
                  <Checks
                    label='Type'
                    name='typeId'
                    errors={errors}
                    register={register}
                    validation={{
                      required: 'This field is required.',
                    }}
                    options={types?.map(type => ({ label: type.name, value: type.id, checked: checkedType === type.id })) || []}
                    onChange={(value) => {
                      setCheckedType(value);
                    }}
                  />
                  <Input
                    type='text'
                    name='title'
                    placeholder='Product title'
                    label='Title'
                    errors={errors}
                    register={register}
                    validation={{
                      required: 'This field is required.'
                    }}
                    required
                  />
                  <div className='flex gap-x-2 justify-between items-center'>
                    <Input
                      type='text'
                      name='netWeightValue'
                      placeholder='Product net weight'
                      label='Net weight'
                      errors={errors}
                      register={register}
                      validation={{
                        required: 'This field is required.'
                      }}
                      required
                    />
                    <Checks
                      label='Unit'
                      name='netWeightUnit'
                      errors={errors}
                      register={register}
                      validation={{
                        required: 'This field is required.',
                      }}
                      options={[
                        { label: 'g', value: 'g', checked: checkedNetWeightUnit === 'g' },
                        { label: 'L', value: 'L', checked: checkedNetWeightUnit === 'L' }
                      ]}
                      onChange={(value) => {
                        setCheckedNetWeightUnit(value);
                      }}
                    />
                  </div>
                  <Input
                    type='text'
                    name='price'
                    placeholder='Product price in RON'
                    label='Price (RON)'
                    errors={errors}
                    register={register}
                  />
                  <>
                    { alert && !loading ? <Alert {...alert} /> : null }
                  </>
                </div>
                <div className='w-full'>
                  <Button type='submit' color='blue' className='w-full' loading={loading} disabled={!isValid || loading}>Submit</Button>
                </div>
              </form>
            }
          </div>
        </div>
      :
        <Navigate to='/' />
      }
    </>
  );
};

export default Add;