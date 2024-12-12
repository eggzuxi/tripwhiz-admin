import { Suspense, lazy } from 'react';
import { RouteObject, Navigate } from 'react-router';
import SuspenseLoader from '../components/SuspenseLoader';
import qnaRouter from './qnaRouter';
import faqRouter from './faqRouter';
import boaRouter from './boardRouter';
import productRouter from './productRouter';
import storeOwnerRouter from './storeOwnerRouter';
import SidebarLayout from '../layouts/SidebarLayout';
import ordRouter from './ordRouter';
import stockRouter from './stockRouter';
import SpotRouter from './spotRouter';
import adminRouter from './adminRouter';
import luggageMoveRouter from './luggageMoveRouter';
import luggagestorageRouter from './luggagestorageRouter';
import memberRouter from './memberRouter';

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
const SignUp = Loader(lazy(() => import('../login/pages/SignUPPages')));

const mainRouter: RouteObject[] = [
  // 기본 경로를 로그인 화면으로 설정
  {
    path: '/',
    element: <Navigate to="/login" replace /> // 기본 경로에서 /login으로 리다이렉트
  },
  // 로그인 경로
  {
    path: '/login',
    element: <Login />
  },
  // 회원가입 경로 추가
  {
    path: '/signup',
    element: <SignUp />
  },
  // 메인 애플리케이션 경로
  {
    path: '/app',
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
      ...ordRouter,
      ...productRouter,
      ...stockRouter,
      ...SpotRouter,
      ...storeOwnerRouter,
      ...adminRouter,
      ...luggageMoveRouter,
      ...luggagestorageRouter,
      ...memberRouter
    ]
  }
];

export default mainRouter;