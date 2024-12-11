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
const MemberListPage = Loader(
  lazy(() => import('../member/pages/MemberListPage'))
);

// 라우터 설정
const memberRouter: RouteObject[] = [
  {
    path: 'member',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <MemberListPage />
      }
    ]
  }
];

export default memberRouter;
