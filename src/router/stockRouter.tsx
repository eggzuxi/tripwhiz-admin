import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const StockCheck = Loader(
  lazy(() => import('../stock/pages/StockCheckPage'))
);

const StockOrder = Loader(
  lazy(() => import('../stock/pages/StockOrderPage'))
);

const stockRouter: RouteObject[] = [
  {
    path: 'stock',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />,
      },
      {
        path: 'list',  // 재고 목록 페이지
        element: <StockCheck />,
      },
      {
        path: 'order',  // 발주 목록 페이지
        element: <StockOrder />,
      },
    ],
  },
];

export default stockRouter