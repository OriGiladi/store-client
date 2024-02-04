import { redirect } from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { addingProductValidator } from "../validators/product";
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
    const requestData = {
        name, 
        price,
        description,
        image 
    };
    const validationResult = addingProductValidator( price.toString()) 
    if(validationResult.price === '')
    {
        try {
            await axios.post(`${BASE_URL}/product`, requestData, {
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
