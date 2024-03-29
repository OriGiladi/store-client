import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/ubuntu';

//pages
import ErorrPage from "./error-routes/error";
import Registration from "./routes/Registration";
import { registrationAction } from "./actionsAndLoaders/registration";
import{ loginAction } from './actionsAndLoaders/login';
import Login from "./routes/login";
import  RootLayout  from "./routes/rootLayout";
import { allProductsLoader } from "./actionsAndLoaders/dashboard";
import { AddProduct } from "./routes/AdminFeatures/AddProduct";
import { addProductAction } from "./actionsAndLoaders/addProduct";
import { EditProduct } from "./routes/AdminFeatures/EditProduct";
import { editProductAction, editProductLoader } from "./actionsAndLoaders/editProduct";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import { forgotPasswordAction, forgotPassweordLoader } from "./actionsAndLoaders/forgotPassowrd";
import ErrorPage from "./error-routes/error";
import { ShoppingCart } from "./routes/ShoppingCart/ShoppingCart";
import Dashboard from "./routes/Product/Dashboard";
import { ordersByUserIdLoader } from "./actionsAndLoaders/orderHirstory";
import RouteProtector from "./routes/RouteProtector";
import { userRole, userRoles } from "./utils/constants";
import OrderHistoryProtector from "./routes/OrderHistory/OrderHistoryProtector";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                loader: allProductsLoader,
            },
            {
                path: 'add-product',
                element: <RouteProtector component={AddProduct} roles={[userRole.admin as userRoles]}  />,
                action: addProductAction,
                errorElement: <ErorrPage />
            },
            {
                path: 'edit-product/:id', 
                element:  <RouteProtector component={EditProduct} roles={[userRole.admin as userRoles]}  />,
                action: editProductAction,
                loader: editProductLoader 
            },
            {
                path: "/cart",
                element: <ShoppingCart />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
                action: forgotPasswordAction,
                loader: forgotPassweordLoader,
                errorElement: <ErrorPage/>
            },
            {
                path: '/order-history/:userId',
                element:  <RouteProtector component={OrderHistoryProtector} roles={[userRole.user as userRoles, userRole.admin as userRoles]}  />,
                loader: ordersByUserIdLoader,
            },
            {
                path: "/register",
                element: <RouteProtector component={Registration} roles={[undefined]}  />, // disables registered users to enter registration again
                action: registrationAction,
            },
            {
                path: "/login",
                element: <RouteProtector component={Login} roles={[undefined]}  />,
                action: loginAction,
            },
            {
                path: "*",
                element: <ErorrPage />
            }
        ],
    },
    {
        path: "*",
        element: <ErorrPage />
    }
]);  

const theme = extendTheme({
    fonts: {
        heading: `'Ubuntu', sans-serif`,
        body: `'Ubuntu', sans-serif`,
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);