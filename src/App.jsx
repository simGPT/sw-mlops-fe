import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import Signup from '@/pages/Signup/Signup';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        children: [{ path: '/signup', Component: Signup }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
