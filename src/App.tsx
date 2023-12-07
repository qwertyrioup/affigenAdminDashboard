import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Orders from "./pages/orders/Orders";

import Contacts from "./pages/contacts/Contacts";

import Order from "./pages/order/Order";


import Affigen from "./pages/affigen/Affigen";
import Odoo from "./pages/odoo/Odoo";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import { useSelector } from 'react-redux'
import {RootState} from './redux/store'

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAppSelector } from "./redux/hooks";
import Posts from "./pages/posts/Posts";
import Categories from "./pages/categories/Categories";
import Posters from "./pages/posters/Posters";
import Brands from "./pages/brands/Brands";


const queryClient = new QueryClient();

function App() {
  const user = useAppSelector(state => state.user.currentUser)


  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (user ? <Home /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/users",
          element: (user ? <Users /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/odoo",
          element: (user ? <Odoo /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/affigen",
          element: (user ? <Affigen /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/orders",
          element: (user ? <Orders /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/categories",
          element: (user ? <Categories /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/order/:id",
          element: (user ? <Order /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/user",
          element: (user ? <User /> : <Navigate replace to={"/login"} />),
        },

        {
          path: "/posts",
          element: (user ? <Posts /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/posters",
          element: (user ? <Posters /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/brands",
          element: (user ? <Brands /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/contacts",
          element: (user ? <Contacts /> : <Navigate replace to={"/login"} />),
        },
        {
          path: "/products/:id",
          element: (user ? <Product /> : <Navigate replace to={"/login"} />),
        },
      ],
    },
    {
      path: "/login",
      element: (!user ? <Login /> : <Navigate replace to={"/"} />),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
