import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

// Lazy 로드 컴포넌트 로더
const Loader = (Component: React.FC) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

// StoreOwner 관련 페이지 Lazy 로드
const CreateStoreOwner = Loader(
    lazy(() => import('../admin/pages/CreateStoreOwnerPage'))
);

const ListStoreOwner = Loader(
    lazy(() => import('../admin/pages/ListManagerPage')) // 'ListManagerPage'를 재사용
);

// StoreOwner 라우터 설정
const storeOwnerRouter: RouteObject[] = [
    {
        path: '/storeOwner',
        children: [
            {
                path: '',
                element: <Navigate to="list" replace /> // 기본 경로에서 목록으로 리디렉션
            },
            {
                path: 'list',
                element: <ListStoreOwner /> // 점주 목록 페이지
            },
            {
                path: 'create',
                element: <CreateStoreOwner /> // 점주 생성 페이지
            },
        ]
    }
];

export default storeOwnerRouter;
