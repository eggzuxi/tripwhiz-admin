import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

import SuspenseLoader from '../components/SuspenseLoader';
import qnaRouter from './qnaRouter';
import faqRouter from './faqRouter';
import boaRouter from './boardRouter';
import productRouter from './productRouter';
import storeOwnerRouter from './storeOwnerRouter';
import SidebarLayout from '../layouts/SidebarLayout';
import stockRouter from './stockRouter';
import SpotRouter from './spotRouter';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
          <Component {...props} />
        </Suspense>
    );

// Pages
const Overview = Loader(lazy(() => import('../content/overview')));

// Dashboards
const Crypto = Loader(lazy(() => import('../content/dashboards/Crypto')));

// Applications
const Messenger = Loader(
    lazy(() => import('../content/applications/Messenger'))
);

// Status
const Status404 = Loader(
    lazy(() => import('../content/pages/Status/Status404'))
);

// Authentication
const Login = Loader(lazy(() => import('../login/pages/LoginPages')));

const mainRouter: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Crypto />
      },
      {
        path: '*',
        element: <Status404 />
      },
      ...qnaRouter,
      ...faqRouter,
      ...boaRouter,
      ...productRouter,
      ...stockRouter,
      ...SpotRouter,
      ...storeOwnerRouter
    ]
  }
];

export default mainRouter;
