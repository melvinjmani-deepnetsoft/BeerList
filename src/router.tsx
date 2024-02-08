/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from './components/suspenseLoader';
import HeaderBarLayout from './layouts/headerBarLayout';
import PageNotFound from './pages/notfound';
// eslint-disable-next-line react/display-name
const Loader = (Component: ComponentType<any>) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const BeerList = Loader(lazy(() => import('./pages/beerlist')));

const routes = [
  {
    path: '/',
    element: <HeaderBarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="beer-list" replace />,
      },
      {
        path: 'beer-list',
        element: <BeerList />,
      },
      {
        path: 'bill-list',
        element: <p> Hello World </p>,
      },
      {
        path: "*", 
        element: <PageNotFound />
      }
    ],
  },
];

export default routes;
