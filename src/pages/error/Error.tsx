import React, { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const Error: FC = () => {
  const error: any = useRouteError();
  
  return (
    <div>{error.message}</div>
  );
};

export default Error;