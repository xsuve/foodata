import React, { FC, useEffect } from 'react';
import { BrowserCodeReader, BrowserMultiFormatOneDReader } from '@zxing/browser';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '@/components/button/Button';

const Scan: FC = () => {
  const navigate = useNavigate();

  const handleInit = async () => {
    const reader = new BrowserMultiFormatOneDReader();

    const webcamDevices = await BrowserCodeReader.listVideoInputDevices();
    const selectedDeviceId = webcamDevices[0].deviceId;

    const videoElement: any = document.getElementById('video');

    if (videoElement) {
      const controls = await reader.decodeFromVideoDevice(selectedDeviceId, videoElement, (result, error, controls) => {
        if (result) {
          controls.stop();
          navigate('/add', { state: { code: result.getText() } });
        }
      });

      setTimeout(() => controls.stop(), 60000);
    }
  };

  useEffect(() => {
    handleInit();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <video id='video' playsInline={false} className='w-full h-full absolute top-0 left-0 right-0' style={{
        transform: 'rotateY(180deg)'
      }}></video>
      <Button type='button' color='white' icon={<ArrowLeftIcon />} className='absolute top-6 left-6' onClick={() => navigate(-1)} />
    </div>
  );
};

export default Scan;