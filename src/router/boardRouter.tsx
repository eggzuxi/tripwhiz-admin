import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
          <Component {...props} />
        </Suspense>
    );

const BoardList = Loader(
    lazy(() => import('../board/pages/BoardListPage'))
);

const BoardRead = Loader(
    lazy(() => import('../board/pages/BoardReadPage'))
);

const BoardAdd = Loader(
    lazy(() => import('../board/pages/BoardAddPage'))
);

const boaRouter: RouteObject[] = [
  {
    path: 'boa',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <BoardList/>
      },
      {
        path: 'read/:bno',
        element: <BoardRead/>
      },
      {
        path: 'add',
        element: <BoardAdd/>
      }
    ]
  }
]

export default boaRouter;
