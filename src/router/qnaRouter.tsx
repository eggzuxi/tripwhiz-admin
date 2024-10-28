import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const QnAList = Loader(
  lazy(() => import('../qna/pages/QnaListPage'))
);

const QnARead = Loader(
  lazy(() => import('../qna/pages/QnaReadPage'))
);

const qnaRouter: RouteObject[] = [
  {
    path: 'qna',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <QnAList />
      },
      {
        path: 'read/:qno',
        element: <QnARead />
      }
    ]
  }
];

export default qnaRouter;
