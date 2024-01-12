import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";



//pages
import About from "./routes/about";
import ErorrPage from "./error-routes/error";
import Register from "./routes/register";
import { registerAction } from "./routes/register";
import Login from "./routes/login";
import { loginAction } from "./routes/login";
import { RootLayout } from "./routes/rootLayout";
import { Dashboard, productsLoader } from "./routes/Dashboard";
import ShoppingCart from "./routes/ShoppingCart";
import { Product, productLoader } from "./routes/Product";
import { AddProduct, addProductAction } from "./routes/AddProduct";
import { addProductActionDialog, AddProductCopy } from "./routes/AddPCopy";
import { EditProduct, editProductAction } from "./routes/EditProduct";
import { ProductPageError } from "./error-routes/productPageError";

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
                // errorElement: <ProductPageError /> 
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
                action: loginAction
                // errorElement: <ErrorPage />,
            },
            {
                path: "/register",
                element: <Register />,
                action: registerAction,
            },
            {
                path: "/about",
                element: <About />
                // errorElement: <ErrorPage />,
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
        {/* <ChakraProvider theme={theme}> */}
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);