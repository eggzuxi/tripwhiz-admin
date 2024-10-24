import SidebarLayout from '../layouts/SidebarLayout';
import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const QnAList = Loader(
  lazy(() => import('src/qna/pages/QnaListPage'))
  // lazy(() => import('src/qna/components/list'))
);
const QnARead = Loader(
  lazy(() => import('src/qna/pages/QnaReadPage'))
);


const qnaRouter = {
  path: '/qna',
  element: <SidebarLayout />,
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

};

export default qnaRouter;
