import React, { FC, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '@/components/button/Button';

const Scan: FC = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cameraRef.current) {
      return;
    }

    const scanner = new Html5Qrcode(cameraRef.current.id);
    const scannerStarted = scanner.start(
      { facingMode:  'environment' },
      {
        fps: 10,
        qrbox: { width: 200, height: 100 }
      },
      (_, result) => {
        navigate('/add', { state: { code: result.decodedText } });
      },
      (_, error) => {
        // console.log(error);
      }
    ).catch(error => {
      console.log(error);
      
    });

    return () => {
      scannerStarted.then(() => scanner.stop()).catch(_ => true);
    };
  }, [cameraRef]);

  return (
    <div className='w-screen h-screen bg-black'>
      <div id='camera' className='w-full object-fill' ref={cameraRef}></div>
      <Button type='button' color='white' icon={<ArrowLeftIcon />} className='absolute top-6 left-6' onClick={() => {
        navigate('/');
      }} />
    </div>
  );
};

export default Scan;