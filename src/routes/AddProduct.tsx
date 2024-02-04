import { useState, ChangeEvent, useEffect } from "react";
import { Form } from "react-router-dom";
import '../index.css'
import { addingProductValidator } from "../validators/product";
import {  Box, Button,  FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import rootStore from "../rootStore";
const { userStore } = rootStore
    interface FormData {
        name: string;
        price: string;
        description: string;
        image: string
    }
    interface Validation {
        price: string;
    }

export function AddProduct() {

    useEffect(() => {
        if(!userStore.isAdmin){
            throw new Error("Unauthorize")
        }
    }, [])

    const [validationResult, setValidationResult] = useState<Validation>({
        price: ""
    });

    const validate = () =>{
        setValidationResult( 
            addingProductValidator(
                formData.price.toString()
            )
        )
    }

    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: "",
        description: "",
        image: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Box>
            <Heading size="lg" mb="20px"> Add product properties</Heading>
        <Form method="post" action="/add-product">
                <FormControl mb="40px">
                    <FormLabel> Product Name:</FormLabel>
                    <Input  type="text"
                    name="name"
                    onChange={handleChange}/>
                </FormControl>

                <FormControl mb="40px">
                    <FormLabel> Price:</FormLabel>
                    <Input  type="text"
                    name="price"
                    onChange={handleChange}/>
                    <FormHelperText color="red.500">{validationResult.price}</FormHelperText>
                </FormControl>

                <FormControl mb="40px">
                    <FormLabel> Description:</FormLabel>
                    <Input  type="text"
                    name="description"
                    onChange={handleChange}/>
                </FormControl>
                
                <FormControl mb="40px">
                    <FormLabel> Image URL :</FormLabel>
                    <Input  type="text"
                    name="image"
                    onChange={handleChange}/>
                </FormControl>
                
                <Button mb="50px" colorScheme="red" id="btnAddProduct" type="submit" onClick={validate}>Submit</Button>
            </Form>
        </Box>
    )
}


