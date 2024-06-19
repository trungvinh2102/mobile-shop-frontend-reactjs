import { lazy } from 'react';
import { checkLogged, checkNotLogged } from '../shared/auth-required';

const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))
const Customer = lazy(() => import('../pages/Customer'))
const Cart = lazy(() => import('../pages/Cart'))
const Order = lazy(() => import('../pages/Order'))
const OrderDetails = lazy(() => import('../pages/OrderDetails'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))



const outsideRoutes = [
  {
    path: "/Login",
    element: checkLogged(Login)
  },
  {
    path: "/Register",
    element: checkLogged(Register)
  },
  {
    path: "/Customer",
    element: checkNotLogged(Customer)
  },
  {
    path: "/Cart",
    element: Cart
  },
  {
    path: "/Order-:id",
    element: checkNotLogged(Order)
  },
  {
    path: "/OrderDetails-:id",
    element: checkNotLogged(OrderDetails)
  },
  {
    path: "/ProductDetails-:id",
    element: ProductDetails
  },
]

export default outsideRoutes