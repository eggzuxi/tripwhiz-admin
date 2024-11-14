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

const ProductList = Loader(
  lazy(() => import('../product/pages/ProductListPage'))
);

const ProductAdd = Loader(
  lazy(() => import('../product/pages/ProductAddPage'))
);

const ProductRead = Loader(
  lazy(() => import('../product/pages/ProductReadPage'))
);


const productRouter: RouteObject[] = [
  {
    path: 'product',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <ProductList/>
      },
      {
        path: 'add',
        element: <ProductAdd/>
      },
      {
        path: 'read/:pno',
        element: <ProductRead/>
      }
    ]
  }
]

export default productRouter