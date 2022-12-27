import React, { ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './Auth/LoginPage';
import RegisterPage from './Auth/RegisterPage';

import Home from './Home';
import { Team } from './Team';
import NewTransactionPage from './Transaction/NewTransactionPage';

// type Props = {
//   children?: JSX.Element | undefined;
// };

// const RequireAuth: React.FC<Props> = ({ children }) => {
//   // const dispatch = useDispatch();
//   // const user = useSelector(
//   //   (state) => state?.userReducer?.buildings?.myUserInformation
//   // );
//   // dispatch(
//   //   getMyProfileData(
//   //     localStorage.getItem('userID'),
//   //     localStorage.getItem('token')
//   //   )
//   // );
//   if (!localStorage.getItem('token')) {
//     return <Navigate to="/auth/login" replace={true} />;
//   }
//   return children;
// };

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
    element: <RequireAuth />,
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
