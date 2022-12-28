import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './Auth/LoginPage';
import RegisterPage from './Auth/RegisterPage';
import Home from './Home';
import { LoggedLayout } from './Layout/LoggedLayout';
import { Team } from './Team';
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
]);

export default router;
