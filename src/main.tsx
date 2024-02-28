import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
//pages
import ErorrPage from "./error-routes/error";
import Registration from "./routes/Registration";
import { registrationAction } from "./actionsAndLoaders/registration";
import{ loginAction } from './actionsAndLoaders/login';
import Login from "./routes/login";
import  RootLayout  from "./routes/rootLayout";

import { allProductsLoader } from "./actionsAndLoaders/dashboard";
import { productLoader } from "./actionsAndLoaders/product";
import { Product } from "./routes/Product";
import { AddProduct } from "./routes/AddProduct";
import { addProductAction } from "./actionsAndLoaders/addProduct";
import { addProductActionDialog, AddProductCopy } from "./routes/AddPCopy";
import { EditProduct } from "./routes/EditProduct";
import { editProductAction } from "./actionsAndLoaders/editProduct";
import ForgotPassword from "./routes/ForgotPassword";
import { forgotPasswordAction, forgotPassweordLoader } from "./actionsAndLoaders/forgotPassowrd";
import ErrorPage from "./error-routes/error";
import { ShoppingCart } from "./routes/ShoppingCart/ShoppingCart";
import Dashboard from "./routes/Product/Dashboard";
import { ordersByUserIdLoader } from "./actionsAndLoaders/purchaseHirstory";
import PurcahseHistory from "./routes/PurcahseHistory";

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
                path: 'product/:id',
                element: <Product />,
                loader: productLoader,
                errorElement: <ErorrPage />
            },
            {
                path: 'add-product',
                element: <AddProduct />,
                action: addProductAction,
                errorElement: <ErorrPage />
            },
            {
                path: 'add-product-copy',
                element: <AddProductCopy/>,
                action: addProductActionDialog,
            },
            {
                path: 'edit-product/:id', 
                element: <EditProduct/>,
                action: editProductAction,
                loader: productLoader 
            },
            {
                path: "/cart",
                element: <ShoppingCart />,
            },
            {
                path: "/login",
                element: <Login />,
                action: loginAction,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
                action: forgotPasswordAction,
                loader: forgotPassweordLoader,
                errorElement: <ErrorPage/>
            },
            {
                path: 'purchase-history/:userId',
                element: <PurcahseHistory />,
                loader: ordersByUserIdLoader,
            },
            {
                path: "/register",
                element: <Registration />,
                action: registrationAction,
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

const theme = extendTheme()

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);