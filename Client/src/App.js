import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddBook from "./components/Admin/AddBook";
import EditBook from "./components/Admin/EditBook";
import UserDashboard from "./components/User/Dashboard";
import AdminDashboard from "./components/Admin/Dashboard";
import BorrowedBook from "./components/User/BorrowedBook";
import AllBook from "./components/User/AllBook";

const App = () => {
  return (
    <>
      <h1> Library Management</h1>
      <Outlet />
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/addBook",
        element: <AddBook />,
      },
      {
        path: "/editBook",
        element: <EditBook />,
      },
      {
        path: "/borrowedBook",
        element: <BorrowedBook />,
      },
      {
        path: "/allBook",
        element: <AllBook />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
