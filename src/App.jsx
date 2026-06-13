import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        children: [
          { index: true, Component: Home },
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
