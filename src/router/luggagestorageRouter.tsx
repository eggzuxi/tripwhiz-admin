import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const LuggageStorageList = Loader(
  lazy(() => import('../luggage/pages/LuggageStorageListPage'))
);

const LuggageStorageDetail = Loader(
  lazy(() => import('../luggage/pages/LuggageStorageDetailPage'))
);

const luggageStorageRouter: RouteObject[] = [
  {
    path: 'luggagestorage',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <LuggageStorageList />
      },
      {
        path: ':lsno',
        element: <LuggageStorageDetail />
      }
    ]
  }
];

export default luggageStorageRouter;
