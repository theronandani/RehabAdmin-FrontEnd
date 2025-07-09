import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

import paths, { rootPaths } from './paths';

import PageLoader from '../components/loading/PageLoader';
import Splash from 'components/loading/Splash';
import ApplicationManagement from 'pages/authentication/ApplicationManagement';
import AddRehabAdmin from 'pages/authentication/AddRehebAdmin';
import ClientProgress from 'pages/authentication/ClientProgress';
import RoomAllocation from 'pages/authentication/RoomAllocation';
import Dashboard from 'pages/authentication/Dashboard';
import UserProfile from 'pages/authentication/UserProfile';

const App = lazy(() => import('App'));
const MainLayout = lazy(async () => {
  return Promise.all([
    import('layouts/main-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
const AuthLayout = lazy(async () => {
  return Promise.all([
    import('layouts/auth-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});

const Error404 = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/errors/Error404');
});

const Sales = lazy(async () => {
  return Promise.all([
    import('pages/home/Sales'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Login = lazy(async () => import('pages/authentication/Login'));
const SignUp = lazy(async () => import('pages/authentication/SignUp'));

const ResetPassword = lazy(async () => import('pages/authentication/ResetPassword'));
const ForgotPassword = lazy(async () => import('pages/authentication/ForgotPassword'));

const AddSocialWorker = lazy(async () => import('pages/authentication/AddSocialWorker'));

const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.homeRoot,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.home,
            element: <Sales />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPassword />,
          },
          {
            path: paths.forgotPassword,
            element: <ForgotPassword />,
          },
          {
            path: paths.addsocialworker,
            element: <AddSocialWorker />,
          },
          {
            path: paths.applicationmanagement,
            element: <ApplicationManagement/>,
          },
          {
            path: paths.addrehabadmin,
            element: <AddRehabAdmin/>,
          },
          {
            path: paths.clientprogress,
            element: <ClientProgress/>,
          },
          {
            path: paths.roomallocation,
            element: <RoomAllocation/>,
          },
          {
            path: paths.dashboard,
            element: <Dashboard/>,
          },
          {
            path: paths.userprofile,
            element: <UserProfile/>,
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/elegent' });

export default router;
