import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import Text from '@/components/text/Text';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import Alert, { AlertProps } from '@/components/alert/Alert';
import Input from '@/components/input/Input';
import { addProduct, checkCode } from '@/services/supabase';
import Select, { SelectPropsOption } from '@/components/select/Select';
import { useMarkets } from '@/hooks/useMarkets';
import { useTypes } from '@/hooks/useTypes';

type AddData = {
  images: FileList;
  typeId: SelectPropsOption;
  title: string;
  weight: number;
  marketId: SelectPropsOption;
  price: number | null;
};

const Add: FC = () => {
  const markets = useMarkets();
  const types = useTypes();
  
  const navigate = useNavigate();
  const { state } = useLocation();

  const [alert, setAlert] = useState<AlertProps>();

  const [codeValid, setCodeValid] = useState(false);
  const checkExists = async (code: number) => {
    const checkExistsResult = await checkCode(code);    
    
    if (checkExistsResult?.error) {
      setAlert({
        type: 'error',
        title: 'Code check error.',
        text: checkExistsResult.error
      });
      setCodeValid(false);
      return;
    }

    if (checkExistsResult.count && checkExistsResult.count > 0) {
      setAlert({
        type: 'error',
        title: 'Code already exists.',
        text: 'This code has already been added.'
      });
      setCodeValid(false);
      return;
    }

    setCodeValid(true);
  };
  useEffect(() => {
    if (!state.code) {
      return;
    }    

    checkExists(parseInt(state.code));
  }, [state?.code]);

  const [loading, setLoading] = useState<boolean>(false);
  
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
      typeId: addData.typeId.value,
      title: addData.title,
      weight: addData.weight,
      marketId: addData.marketId.value,
      price: addData.price
    }, addData.images[0]);

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
    <div className='p-6'>
      <div className='flex flex-col gap-y-1 mb-10'>
        <Button type='button' color='white' icon={<ArrowLeftIcon />} className='mb-4' onClick={() => navigate('/')} />
        <Text type='title' color='dark'>Add product</Text>
        <Text type='text' color='light'>Save the scanned code into the database.</Text>
        <div className='flex gap-x-2 mt-6'>
          <Text type='label' color='dark'>Code:</Text>
          <Text type='text' color='light'>{state?.code}</Text>
        </div>
      </div>
      <div>
        { !codeValid
        ?
          <>
            { alert ? <Alert {...alert} /> : null }
          </>
        :
          <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitAdd)} autoComplete='off' noValidate>
            <div className='w-full flex flex-col gap-y-6'>
              <Input
                type='file'
                name='images'
                placeholder='Product image'
                label='Image'
                errors={errors}
                register={register}
              />
              <Select
                name='marketId'
                placeholder='Product market'
                label='Market'
                errors={errors}
                control={control}
                validation={{
                  required: 'This field is required.',
                }}
                options={markets?.map(market => ({ label: market.name, value: market.id })) || []}
                required
              />
              <Select
                name='typeId'
                placeholder='Product type'
                label='Type'
                errors={errors}
                control={control}
                validation={{
                  required: 'This field is required.',
                }}
                options={types?.map(type => ({ label: type.name, value: type.id })) || []}
                required
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
              <Input
                type='text'
                name='weight'
                placeholder='Product weight in grams'
                label='Weight (g)'
                errors={errors}
                register={register}
                validation={{
                  required: 'This field is required.'
                }}
                required
              />
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
  );
};

export default Add;