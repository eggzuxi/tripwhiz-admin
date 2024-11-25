import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

// Lazy loading and suspense wrapper
const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

// Lazy-loaded components for admin
const SignUp = Loader(
    lazy(() => import('../login/pages/SignUPPages'))
);

// Admin router configuration
const adminRouter: RouteObject[] = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                element: <Navigate to="signup" replace />
            },
            {
                path: 'signup',
                element: <SignUp />
            }
        ]
    }
];

export default adminRouter;
