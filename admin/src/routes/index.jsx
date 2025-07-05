import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/signUp";
import ForgotPassword from "../pages/forgotPassword";
import VerifyAccount from "../pages/verify";
import AdminLayout from "../layouts/adminLayout";
import Dashboard from "../pages/dashboard";
import Products from "../pages/products"
import HomeSliderBanners from "../pages/homeSliderBanners"
import CategoryList from "../pages/category";
import SubCategoryList from "../pages/category/subCategoryList"
import Users from "../pages/users";
import Orders from "../pages/orders";
import ResetPassword from "../pages/resetPassword";
import Profile from "../pages/profile";
import ProductDetail from "../pages/products/productDetail";
import AddRams from "../pages/products/addRams";
import AddWeight from "../pages/products/addWeight";
import AddSize from "../pages/products/addSize";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify",
    element: <VerifyAccount />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "homeSlider/list",
        element: <HomeSliderBanners />,
      },
      {
        path: "category/list",
        element: <CategoryList />,
      },
      {
        path: "subCategory/list",
        element: <SubCategoryList />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "products/addRams",
        element: <AddRams />
      },
      {
        path: "products/addWeight",
        element: <AddWeight />
      },
      {
        path: "products/addSize",
        element: <AddSize />
      },
    ],
  },
]);

export default router;
