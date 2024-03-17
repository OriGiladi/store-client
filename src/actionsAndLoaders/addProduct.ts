import { redirect } from "react-router-dom";
import axios from 'axios';
import { isProductValidated, productProperties, productValidator } from "../validators/product";
import { BASE_URL } from "../utils/constants";
import rootStore from "../rootStore";
const { userStore, productStore } = rootStore
import { getHeadersWithJwt } from "../utils/sdk";

export async function addProductAction({ request }: { request: Request }) {
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { name, price, description } = userInfo;
    let {image} = userInfo
    if(image === "")
        image = "none";
    const productProperties = {
        name, 
        price,
        description,
        image 
    } as productProperties;
    const validationResult = productValidator(productProperties) 
    if(isProductValidated(validationResult))
    {
        try {
            await axios.post(`${BASE_URL}/product`, productProperties, {
                headers: getHeadersWithJwt(userStore.userJwt as string)
            });
            productStore.setAllProducts(await productStore.loadAllProducts()) // saving the added product in productStore by reloading all the products
            return redirect("/");
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }
    else{
        return redirect(`/add-product`);
    } 
}
