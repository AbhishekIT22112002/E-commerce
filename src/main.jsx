import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import "./index.css";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { Provider } from 'react-redux';
import { store } from "./app/store.js";
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import { getTotals } from "./app/cartSlice.js";
import Home from "./components/Home.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path : "products",
    element :<Home></Home>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Navbar><Login></Login></Navbar>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path: "/signup",
    element: <Navbar><SignUp></SignUp></Navbar>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path: "/cart",
    element: <Navbar><Cart></Cart></Navbar>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path: "/checkout",
    element: <Navbar><Checkout></Checkout></Navbar>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  {
    path: "/product-details/:id",
    element: <Navbar><ProductDetails></ProductDetails></Navbar>,
    errorElement :<ErrorPage></ErrorPage>,
  },
  
]);

store.dispatch(getTotals());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
    <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
    
  </StrictMode>
);
