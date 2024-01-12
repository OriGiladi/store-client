import React, { useState, ChangeEvent } from "react";
import { Form, redirect } from "react-router-dom";
import axios from "axios";
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";

const baseUrl = 'http://localhost:3000';

interface FormData {
    email: string;
    password: string;
}

export async function loginAction({ request }: { request: Request }) {
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { email, password } = userInfo;

    const requestData = {
        email,
        password
    };

    try {
        const response = await axios.post(`${baseUrl}/login`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        localStorage.setItem('token', response.data.token)
        if(response.data.admin)
            localStorage.setItem('admin', response.data.admin)
        
        return redirect("/");

    } catch (error) {
        console.error(error);
        return { response: false, data: null };
    }
}

const Login:React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [loginError, setLoginError] = useState("")

    const token = localStorage.getItem('token')

    const validate = async () => {
    const { email, password } = formData;

    const requestData = {
        email,
        password
    };

    try {
        await axios.post(`${baseUrl}/login`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // success code

    } catch (error) {
        console.error(error);
        setLoginError("Email or password are invalid")
        return { response: false, data: null };
    }
    }
    
    return (
        <>
        {!token ?
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
                    
                        <FormHelperText color="red.500" mb="40px">
                            {loginError}
                        </FormHelperText>
                    
                </FormControl>
                

                <Button colorScheme="red" onClick={validate} type="submit">Submit</Button>
            </Form>
            </Box>):
            ( <Heading textAlign="center" my='30' p="10px">
            You are already logged in</Heading>
            )
        }
        </>
        
    )
}

export default Login