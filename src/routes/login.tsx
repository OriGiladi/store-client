import { useState, ChangeEvent } from "react";
import { Form, json, redirect, useNavigate,   } from "react-router-dom";
import axios from "axios";
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import { LoginRequest, baseUrl } from "../utils/constants";
import rootStore from '../rootStore'

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
        const response = await axios.post(`${baseUrl}/login`, requestData, {
            headers: { // TODO: create getHeader function in utils
                'Content-Type': 'application/json',
            }
        });
        localStorage.setItem('userJwt', response.data.token)
        if(response.data.admin) // TODO: deal with admin as I'm dealing with token 
        {
            console.log("@@",response.data.admin )
            localStorage.setItem('isAdmin', response.data.admin)
            userStore.setIsAdmin(response.data.admin)
            console.log("@@",userStore.isAdmin )
        }
            
        userStore.userJwtAuthentication()
        return response
    } catch (error) {

        if (error.response.status === 401 || error.response.status === 404 ) // TODO: don't use magic numbers
        {
            throw json(
                {
                    message: "Invalid email or password",
                },
            );
        }
        else {  
            throw json(
                {
                    message: "There is a problem in our server",
                },
            );
        }
    }
}

const Login = () => {
    const {userStore} = rootStore
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [loginError, setLoginError] = useState("")
    return (
        <>
        {!userStore.userJwt ?
        ( <Box textAlign="center" maxWidth='480px'>
            <Heading my='30' p="10px">Log In</Heading>
            <Form method="post" id="register-form" action="/login">
                <FormControl mb="40px">
                        <FormLabel> Email:</FormLabel>
                        <Input  type="text"
                        name="email"
                        onChange={handleChange}/>
                </FormControl>

                <FormControl mb="40px">
                        <FormLabel> Password:</FormLabel>
                        <Input  type="password"
                        name="password"
                        onChange={handleChange}/>
                </FormControl>

                <FormControl>
                    
                        <FormHelperText color="red.500" mb="40px" fontWeight="600">
                            {loginError}
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