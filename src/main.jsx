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


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/cart",
    element: <Cart></Cart>,
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/product-details/:id",
    element: <Navbar><ProductDetails></ProductDetails></Navbar>,
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
