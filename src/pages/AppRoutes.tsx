import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AccountPage from './Account/AccountPage';
import EditAccountPage from './Account/EditAccountPage';
import NewAccountPage from './Account/NewAccountPage';
import LoginPage from './Auth/LoginPage';
import RegisterPage from './Auth/RegisterPage';
import Error404 from './Error404';
import Home from './Home';
import { LoggedLayout } from './Layout/LoggedLayout';
import { Team } from './Team';
import EditTransactionPage from './Transaction/EditTransactionPage';
import NewTransactionPage from './Transaction/NewTransactionPage';

const RequireAuth = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/auth/login" replace={true} />;
  } else {
    return <Outlet />;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LoggedLayout>
        <RequireAuth />
      </LoggedLayout>
    ),

    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'transaction',
        children: [
          {
            path: 'add',
            element: <NewTransactionPage />,
          },
          {
            path: ':id/edit',
            element: <EditTransactionPage />,
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'add',
            element: <NewAccountPage />,
          },
          {
            path: ':id',
            element: <AccountPage />,
          },
          {
            path: ':id/edit',
            element: <EditAccountPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

export default router;
