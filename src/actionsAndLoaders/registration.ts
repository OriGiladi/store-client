import { redirect } from "react-router-dom";
import axios from 'axios';
import { firstNameValidator, lastNameValidator, emailValidator, passwordValidator } from "../validators/registrationValidators";
import { BASE_URL } from "../utils/constants";
import { getHeaders } from "../utils/sdk";
import rootStore from "../rootStore";
const { userStore } = rootStore

export async function registrationAction({ request }: { request: Request }) {
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { firstName, lastName, email, password } = userInfo;
    let {image} = userInfo
    if(image === "")
        image = "none";
    const requestData = {
        firstName,
        lastName,
        email,
        password,
        image 
    };
    if(firstNameValidator(firstName.toString()) === '' &&
    lastNameValidator(lastName.toString())=== '' && 
    emailValidator(email.toString()) === '' && 
    passwordValidator(password.toString()) === '' )
    {
        try {
            const response = await axios.post(`${BASE_URL}/register`, requestData, {
                headers: getHeaders()
            });
            localStorage.setItem('userJwt', response.data.userJwt)
            userStore.userJwtAuthentication()
            return redirect("/");
    
        } catch (error) {
            console.error(error);
            return { validationMessage:{ email: "This email adress is already taken" } }
        }
    }
    else{
        return { validationMessage: {
                firstName: firstNameValidator(firstName.toString()),
                lastName: lastNameValidator(lastName.toString()),
                email: emailValidator(email.toString()),
                password: passwordValidator(password.toString())
            }}
    }
}