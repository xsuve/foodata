import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import '@/styles.css';

import Home from '@/pages/home/Home';
import Error from '@/pages/error/Error';
import Scan from '@/pages/scan/Scan';
import Add from '@/pages/add/Add';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/scan',
    element: <Scan />
  },
  {
    path: '/add',
    element: <Add />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
