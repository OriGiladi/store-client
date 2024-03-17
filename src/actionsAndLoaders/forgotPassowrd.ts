import { passwordValidator } from '../validators/registrationValidators';
import axios from 'axios';
import rootStore from '../rootStore';
import { getHeaders } from '../utils/sdk';
import { BASE_URL } from '../utils/constants';
import { LoaderFunction, redirect } from 'react-router';
const { forgotPasswordStore } = rootStore

export async function forgotPasswordAction({ request }: { request: Request }) {
    const formData = await request.formData()
    const { password } = Object.fromEntries(formData);
    const requestBody = {
        email: forgotPasswordStore.email,
        password: password
    }
    const passwordValidationError = passwordValidator(requestBody.password as string)
    if( passwordValidationError === '' )
    {
        try {
            await axios.patch(`${BASE_URL}/login`, requestBody, {
                headers: getHeaders()
            });
            return redirect("/login");
        } catch (error) {
            console.error(error);
            return {message: "There is a server error"}
        }
    }
    else{
        return { message: passwordValidationError } // displays the validation error
    }
}

export const  forgotPassweordLoader: LoaderFunction = async () => {
    const res = await axios.post(`${BASE_URL}/login/isSuchUser`, {email: forgotPasswordStore.email}, {
        headers: getHeaders()})
    forgotPasswordStore.setIsSuchUser(res.data as boolean)
    return null
}