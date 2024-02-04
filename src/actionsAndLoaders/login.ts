import { redirect } from "react-router-dom";
import axios from "axios";
import { BASE_URL, NOT_FOUND_STATUS_CODE, UNAUTHORIZED_STATUS_CODE } from "../utils/constants";
import rootStore from '../rootStore'
import { getHeaders } from "../utils/sdk";

export async function loginAction({ request }: { request: Request }) {
    const {userStore} = rootStore
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { email, password } = userInfo;
    const requestData = {
        email,
        password
    };
    try {
        const response = await axios.post(`${BASE_URL}/login`, requestData, { headers: getHeaders() });
        localStorage.setItem('userJwt', response.data.token)
        if(response.data.admin) // TODO: deal with admin as I'm dealing with token 
        {
            localStorage.setItem('isAdmin', response.data.admin)
            userStore.setIsAdmin(response.data.admin)
        }
            
        userStore.userJwtAuthentication()
        return redirect('/')
    } catch (error) {
        if(axios.isAxiosError(error)){
            if (error.response?.status === UNAUTHORIZED_STATUS_CODE || error.response?.status === NOT_FOUND_STATUS_CODE ){
                return { message: "Invalid email or password" }
            }
        } 
        else{
            return { message: "There is a problem in our server" }
        }
    }
}