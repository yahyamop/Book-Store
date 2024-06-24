import AuthLayout from "@/components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";
import BookPage from "@/pages/BookPage";
import BooksPage from "@/pages/BooksPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import WishListPage from "../pages/WishListPage";
import DashboardCategoryPage from "../pages/dashboard/DashboardCategoryPage";
import DashboardBookPage from "../pages/dashboard/DashboardBookPage";
import AddNewCategoryPage from "@/pages/dashboard/AddNewCategoryPage";
import AddNewBookPage from "@/pages/dashboard/AddNewBookPage";
import AdminDashboardLayout from "@/components/layouts/AdminDashboardLayout";
import CheckOutPage from "@/pages/CheckOutPage";
// import EditBookPage from "@/pages/dashboard/EditBookPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ContactUsPage from "@/pages/ContactUsPage";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/books", "/book", "/books/:id","/wishlist","/checkout","/contact-us",];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/books/:id",
        element: <BookPage />,
      },
      {
        path: "/wishlist",
        element: <WishListPage />,
      },
      {
        path: "/register",
        element: <SignUpPage />,
      },
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage/>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "/dashboard/categories",
        element: <DashboardCategoryPage />,
      },
      {
        path: "/dashboard/categories/add",
        element: <AddNewCategoryPage />,
      },
      {
        path: "/dashboard/books",
        element: <DashboardBookPage />,
      },
      {
        path: "/dashboard/books/add",
        element: <AddNewBookPage />,
      },
      // {
      //   path: "/dashboard/books/edit/:id",
      //   element: <EditBookPage />,
      // },
    ],
  },
]);
