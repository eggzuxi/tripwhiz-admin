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

// const OrderIndex = Loader(
//   lazy(() => import('../order/pages/OrderIndex'))
// );

const OrderList = Loader(
  lazy(() => import('../order/pages/OrderListPage'))
);

const OrderRead = Loader(
  lazy(() => import('../order/pages/OrderReadPage'))
);

const OrdRouter: RouteObject[] = [
  {
    path: 'ord',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <OrderList/>
      },
      {
        path: 'read/:ono',
        element: <OrderRead/>
      }
    ]
  }
]

export default OrdRouter;
