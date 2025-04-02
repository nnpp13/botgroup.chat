import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Chat from './pages/chat';
import BasicLayout from './layouts/BasicLayout';
import AuthGuard from './components/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Chat />,
      },
    ],
  },
]); 