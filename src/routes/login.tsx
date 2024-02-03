import { useState, ChangeEvent } from "react";
import { Form, redirect,useNavigate, useActionData } from "react-router-dom";
import axios from "axios";
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import {authActionError, LoginRequest } from '../utils/types';
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

const Login = () => {
    const {userStore, forgotPasswordStore} = rootStore;
    const navigate = useNavigate()
    const errorInAction: authActionError = useActionData() as authActionError // returns the error in the action if occurs
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    function sendToForgotPasswordPage(email: string) {
        if(email)
        {
            forgotPasswordStore.setEmail(email)
            navigate('/forgot-password')
        }
        
    }

    return (
        <>
        {!userStore.userJwt ?
        ( <Box textAlign="center" maxWidth='480px'>
            <Heading my='30' p="10px">Log In</Heading>
            <Form method="post" id="login-form" action="/login">
                <FormControl mb="10px">
                        <FormLabel> Email:</FormLabel>
                        <Input type="text"
                        name="email"
                        onChange={handleChange}/>
                </FormControl>

                <FormControl mb="40px">
                        <FormLabel> Password:</FormLabel>
                        <Input type="password"
                        name="password"
                        onChange={handleChange}/>
                </FormControl>

                <FormControl mb="40px">
                    <Text 
                        onClick={() => {
                            sendToForgotPasswordPage(formData.email)
                        }}
                        textAlign={'left'}
                        color="blue" 
                        _hover={{ cursor: 'pointer' }}>
                            Forgot your password?
                    </Text>
                </FormControl>

                <FormControl>
                        <FormHelperText color="red.500" mb="40px" fontWeight="600">
                            {errorInAction ? (<Box>{errorInAction.message}</Box>) : (null)}
                        </FormHelperText>
                </FormControl>

            <Button colorScheme="red" type="submit">Submit</Button>
            </Form>
            </Box>) :
            ( <Heading textAlign="center" my='30' p="10px">
            You are already logged in</Heading>  
            )
        }
        </>
    )
}
export default Login