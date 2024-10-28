import { lazy, Suspense } from 'react';
import SuspenseLoader from '../../../tripwhiz/src/components/SuspenseLoader';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
  );

const FaQList = Loader(
  lazy(() => import('../../../tripwhiz/src/faq/pages/FaqListPage'))
);

const FaQAdd = Loader(
  lazy(() => import('../../../tripwhiz/src/faq/pages/FaqAddPage'))
);

const FaQModi = Loader(
  lazy(() => import('../../../tripwhiz/src/faq/pages/FaqModifyPage'))
);

const faqRouter: RouteObject[] = [
    {
        path: 'faq',
        children: [
            {
                path: '',
                element: <Navigate to="list" replace />
            },
            {
                path: 'list',
                element: <FaQList/>
            },
            {
                path: 'add',
                element: <FaQAdd />
            },
            {
                path: 'update/:fno',
                element: <FaQModi />
            }
        ]
    }
];

export default faqRouter;

