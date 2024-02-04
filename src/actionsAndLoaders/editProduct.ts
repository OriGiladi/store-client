import { redirect } from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { addingProductValidator } from "../validators/product";
import { BASE_URL } from "../utils/constants";
import rootStore from "../rootStore";
import { extractParameterFromUrl, getHeadersWithJwt } from "../utils/sdk";
const { userStore, productStore } = rootStore

export async function editProductAction({ request }: { request: Request }) {
    const productId = extractParameterFromUrl(window.location.href)
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { name, price, description, image } = userInfo;

    const requestData = {
        name, 
        price,
        description,
        image ,
    };
    const validationResult = addingProductValidator(price.toString()) 
    if(validationResult.price === '')
    {
        try {
            await axios.patch(`${BASE_URL}/product/${productId}`, requestData, {
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