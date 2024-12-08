import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';

// 로더 컴포넌트 정의
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// 동적 로딩할 컴포넌트
const LuggageMoveList = Loader(
  lazy(() => import('../luggage/pages/LuggageMoveListPage'))
);

const LuggageMoveDetail = Loader(
  lazy(() => import('../luggage/pages/LuggageMoveDetailPage'))
);

// 라우터 설정
const luggageMoveRouter: RouteObject[] = [
  {
    path: 'luggagemove',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <LuggageMoveList />
      },
      {
        path: 'read/:lmno',
        element: <LuggageMoveDetail />
      }
    ]
  }
];

export default luggageMoveRouter;
