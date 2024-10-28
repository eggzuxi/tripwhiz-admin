import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import SidebarLayout from '../layouts/SidebarLayout';
import { Navigate } from 'react-router-dom';
import BoardListPage from '../board/pages/BoardListPage';
import BoardReadPage from '../board/pages/BoardReadPage';
import BoardAddPage from '../board/pages/BoardAddPage';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
          <Component {...props} />
        </Suspense>
    );

const BoardList = Loader(
    lazy(() => import('src/board/pages/BoardListPage'))
);
const BoardRead = Loader(
    lazy(() => import('src/board/pages/BoardReadPage'))
);
const BoardAdd = Loader(
    lazy(() => import('src/board/pages/BoardAddPage'))
);

const boaRouter = {
  path: '/boa',
  element: <SidebarLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="list" replace />
    },
    {
      path: 'list',
      element: <BoardListPage />
    },
    {
      path: 'read/:bno',
      element: <BoardReadPage />
    },
    {
      path: 'add',
      element: <BoardAddPage />
    }
  ]
};

export default boaRouter;