import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        children: [
          { path: '/login', Component: Login },
          { path: '/signup', Component: Signup },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
