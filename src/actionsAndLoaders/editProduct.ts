import { redirect } from "react-router-dom";
import axios from 'axios';
import { isProductValidated, productProperties, productValidator } from "../validators/product";
import { BASE_URL } from "../utils/constants";
import rootStore from "../rootStore";
import { extractParameterFromUrl, getHeadersWithJwt } from "../utils/sdk";
const { userStore, productStore } = rootStore
import { LoaderFunction } from 'react-router-dom';

export const  editProductLoader: LoaderFunction = async ({params}) => {
    const {id} = params
    const res = await fetch(`${BASE_URL}/product/${id}`)
    return res.json()
}

export async function editProductAction({ request }: { request: Request }) {
    const productId = extractParameterFromUrl(window.location.href)
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { name, price, description, image } = userInfo;

    const productProperties = {
        name, 
        price,
        description,
        image ,
    } as productProperties;
    const validationResult = productValidator(productProperties) 
    if(isProductValidated(validationResult))
    {
        try {
            await axios.patch(`${BASE_URL}/product/${productId}`, productProperties, {
                headers: getHeadersWithJwt(userStore.userJwt as string)
            });
            productStore.setAllProducts(await productStore.loadAllProducts()) // saving the edited product in productStore by reloading all the products
            return redirect("/");
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }
    else{
        return redirect(`/edit-product/${productId}`);
    }
}