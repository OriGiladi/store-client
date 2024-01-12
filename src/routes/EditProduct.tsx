import { useState, ChangeEvent, useEffect } from "react";
import { Form, redirect, useLoaderData} from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { addingProductValidator } from "../validators/product";
import {  Avatar, Box, Button,  FormControl, FormHelperText, FormLabel, HStack, Heading, Input } from "@chakra-ui/react";

const baseUrl = 'http://localhost:3000';

const admin = localStorage.getItem('admin')

interface FormData {
    name: string;
    price: string;
    description: string;
    image: string
}
interface Validation {
    price: string;
}
interface Product{
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
}

interface LoadedData {
    data: Product 
}
export async function editProductAction({ request }: { request: Request }) {

    const loader = useLoaderData()
    console.log(loader)
    const token = localStorage.getItem('token')
    
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    let { name, price, description } = userInfo;
    let {image} = userInfo
    if(image === "")
        image = "";
    if(price === "")
        price = "";
    if(name === "")
        name = "";
    if(description === "")
        description = "";
    const requestData = {
        name, 
        price,
        description,
        image ,
    };
    const validationResult = addingProductValidator( price.toString()) 
    if(validationResult.price === '')
    {
        try {
            await axios.patch(`${baseUrl}/product/652ba24b71c865436a1f7740`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }
            });

            return redirect("/");
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }
    else{
        return redirect(`/edit-product`);
    }
    
}
    
export function EditProduct() {

    useEffect(() => {
        if(!admin)
        {
            redirect("/error")
        }

    }, [])



    const loaded: LoadedData  = useLoaderData() as LoadedData 
    const product: Product  = loaded.data;


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
        <Heading size="lg" mb="20px"> Edit product properties</Heading>
    <Form method="post" action="/edit-product">
            <FormControl mb="40px">
                <FormLabel> Product Name:</FormLabel>
                <Input   type="text"
                name="name"
                defaultValue={product.name}
                onChange={handleChange}/>
            </FormControl>

            <FormControl mb="40px">
                <FormLabel> Price:</FormLabel>
                <Input  type="text"
                name="price"
                defaultValue={product.price}
                onChange={handleChange}/>
                <FormHelperText color="red.500">{validationResult.price}</FormHelperText>
            </FormControl>

            <FormControl mb="40px">
                <FormLabel> Description:</FormLabel>
                <Input  type="text"
                name="description"
                defaultValue={product.description}
                onChange={handleChange}/>
            </FormControl>
            
            <FormControl mb="40px">
            <HStack spacing="20px">
                <FormLabel> Image URL :</FormLabel>
                <Avatar src={product.image} />
            </HStack>
                <Input  type="text"
                name="image"
                defaultValue={product.image}
                onChange={handleChange}/>
            </FormControl>
            
            <Button mb="50px" colorScheme="red" id="btnSubmit" type="submit" onClick={validate}>Submit</Button>
        </Form>
    </Box>
    )
}
