import { useState, ChangeEvent } from "react";
import { Form, redirect, useActionData} from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { registrationValidators } from "../validators/registrationValidators";
import {  Box, Button,  FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import { authActionError, baseUrl } from "../utils/constants";
import rootStore from "../rootStore";
const {userStore} = rootStore

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string
}
interface Validation {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


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
    const validationResult = registrationValidators(firstName.toString(), lastName.toString(), email.toString(), password.toString()) 
    if(validationResult.firstName === '' && validationResult.lastName === '' && validationResult.email === '' && validationResult.password === '' )
    {
        try {
            const response = await axios.post(`${baseUrl}/register`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            localStorage.setItem('userJwt', response.data.token)
            userStore.userJwtAuthentication()
            return redirect("/");
    
        } catch (error) {
            console.error(error);
            return {message: "This email adress is already taken"}
        }
    }
    else{
        return redirect(`/register`);
    }
}



const Registration = () => {
    const errorInAction: authActionError = useActionData() as authActionError // returns the error in the action if occurs
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        image: ""
    });
    const [validationResult, setValidationResult] = useState<Validation>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const validate = () =>{
        setValidationResult( 
            registrationValidators(
                formData.firstName.toString(), 
                formData.lastName.toString(),
                formData.email.toString(), 
                formData.password.toString()
            )
        )
    }

    return (
        <>
        {!userStore.userJwt ?
        (
            <Box>
            <Heading textAlign="center" my='30' p="10px">Registration</Heading>
            <Form method="post" id="register-form" action="/register">
                    <FormControl mb="40px">
                        <FormLabel> First Name:</FormLabel>
                        <Input  type="text"
                        name="firstName"
                        id="txtFirstName"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{validationResult.firstName}</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Last Name:</FormLabel>
                        <Input  type="text"
                        name="lastName"
                        id="txtLastName"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{validationResult.lastName}</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Email:</FormLabel>
                        <Input  type="text"
                        name="email"
                        id="txtEmail"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{errorInAction ? errorInAction.message : validationResult.email }</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Password:</FormLabel>
                        <Input  type="password"
                        name="password"
                        id="txtPassword"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{validationResult.password}</FormHelperText>
                    </FormControl>
                    
                    <FormControl mb="40px">
                        <FormLabel> Image URL:</FormLabel>
                        <Input  type="text"
                        name="image"
                        onChange={handleChange}/>
                    </FormControl>
                    
                    <Button mb="50px" colorScheme="red" id="btnSubmit" type="submit" onClick={validate}>Submit</Button>
                </Form>
            </Box>
        ):
        (
            <Heading textAlign="center" my='30' p="10px">
            You are already registered </Heading>
        )}
            

        </>
    );
};

export default Registration;
