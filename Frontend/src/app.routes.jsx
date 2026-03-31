import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import ResetPassword from "./features/auth/pages/ResetPassword";
import LandingPage from "./LandingPage";
import ForgotPassword from "./features/auth/pages/ForgotPassword";



export const router = createBrowserRouter([
 {
  path: "/",
  element: <LandingPage />,
},
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
   {
    path: "/reset-password",
    element: <ResetPassword />
  },

  {
  path: "/forgot-password",
  element: <ForgotPassword />
},

  {
    path: "/home",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/interview/:interviewId",
    element:  <Protected> <Interview/></Protected>
  }
]);