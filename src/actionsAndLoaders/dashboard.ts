import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getHeadersWithJwt } from "../utils/sdk";
import rootStore from "../rootStore";
const {userStore} = rootStore

export async function deleteProductAction({ request }: { request: Request }){
    const data = await request.formData()
    const userInfo = Object.fromEntries(data)
    const { id } = userInfo
    try {
        await axios.delete(`${BASE_URL}/product/${id}`, {
            headers: getHeadersWithJwt(userStore.userJwt as string)
        });
        return { response: true, data: "succeeded" };
    } catch (error) {
        console.error(error);
        return { response: false, data: null };
    }
}

export async function allProductsLoader() {
    const res = await fetch(`${BASE_URL}/product`)
    return res.json()
}