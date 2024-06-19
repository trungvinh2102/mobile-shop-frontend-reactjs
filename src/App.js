import React, { Fragment, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import publicRoutes from "./routes";
import outsideRoutes from "./routes/outside.route";


const Header = lazy(() => import('./shared/components/Layout/Header'))
const DashboardLayout = lazy(() => import('./shared/components/Layout/DashboardLayout'))


const App = () => {
  return (
    <Fragment>
      <Suspense>
        <Header />
        <Routes>
          {
            outsideRoutes.map((route, index) => <Route key={index} path={route.path} element={<route.element />} />)
          }
          <Route element={<DashboardLayout></DashboardLayout>} >
            {
              publicRoutes.map((route, index) => <Route key={index} path={route.path} element={<route.element />} />)
            }
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};
export default App;
