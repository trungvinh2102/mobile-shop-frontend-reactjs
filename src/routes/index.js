import { lazy } from "react"

const Home = lazy(() => import('../pages/Home'))
const Category = lazy(() => import('../pages/Category'))
const Success = lazy(() => import('../pages/Success'))
const Search = lazy(() => import('../pages/Search'))
const NotFound = lazy(() => import('../pages/NotFound'))


const publicRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Category-:id",
    element: Category
  },
  {
    path: "/Search",
    element: Search
  },
  {
    path: "/Success",
    element: Success
  },
  {
    path: "*",
    element: NotFound
  },
]

export default publicRoutes;

