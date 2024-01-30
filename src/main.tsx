import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
//pages
import ErorrPage from "./error-routes/error";
import Registration from "./routes/Registration";
import { registrationAction } from "./routes/Registration";
import Login ,{ loginAction } from "./routes/Login";
import  RootLayout  from "./routes/rootLayout";
import { Dashboard, productsLoader } from "./routes/Dashboard";
import {ShoppingCart} from "./routes/ShoppingCart";
import { Product, productLoader } from "./routes/Product";
import { AddProduct, addProductAction } from "./routes/AddProduct";
import { addProductActionDialog, AddProductCopy } from "./routes/AddPCopy";
import { EditProduct, editProductAction } from "./routes/EditProduct";
import ForgotPassword, { forgotPassweordLoader, forgotPasswordAction } from "./routes/ForgotPassword";
import ErrorPage from "./error-routes/error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                loader: productsLoader,
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