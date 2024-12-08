import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SpotList = Loader(
  lazy(() => import('../spot/pages/SpotListPage'))
);

const SpotRead = Loader(
  lazy(() => import('../spot/pages/SpotReadPage'))
);

const SpotAdd = Loader(
  lazy(() => import('../spot/pages/SpotAddPage'))
);



const spotRouter: RouteObject[] = [
  {
    path: 'spot',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <SpotList />
      },
      {
        path: 'read/:spno',
        element: <SpotRead />
      },
      {
        path: 'add',
        element: <SpotAdd />
      },

    ]
  }
];

export default spotRouter;
