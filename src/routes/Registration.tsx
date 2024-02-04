import { useState, ChangeEvent } from "react";
import { Form, useActionData} from "react-router-dom";
import '../index.css'
import {  Box, Button,  FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import { registrationActionError } from '../utils/types';
import rootStore from "../rootStore";
const { userStore } = rootStore

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

const Registration = () => {
    const errorInAction: registrationActionError = useActionData() as registrationActionError // returns the error in the action if occurs
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
        if(errorInAction?.validationMessage) {
            setValidationResult(errorInAction.validationMessage) 
        }
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
                        <FormHelperText color="red.500">{ validationResult.firstName }</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Last Name:</FormLabel>
                        <Input  type="text"
                        name="lastName"
                        id="txtLastName"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{ validationResult.lastName }</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Email:</FormLabel>
                        <Input  type="text"
                        name="email"
                        id="txtEmail"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{ validationResult.email }</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Password:</FormLabel>
                        <Input  type="password"
                        name="password"
                        id="txtPassword"
                        onChange={handleChange}/>
                        <FormHelperText color="red.500">{ validationResult.password }</FormHelperText>
                    </FormControl>
                    
                    <FormControl mb="40px">
                        <FormLabel> Image URL:</FormLabel>
                        <Input  type="text"
                        name="image"
                        onChange={handleChange}/>
                    </FormControl>
                    
                    <Button mb="50px" colorScheme="red" id="btnRegistration" type="submit" onClick={validate}>Submit</Button>
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