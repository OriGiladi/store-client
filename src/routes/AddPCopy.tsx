import { useState, ChangeEvent, useEffect } from "react";
import { Form, redirect} from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { addingProductValidator } from "../validators/product";
import {  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button,  FormControl, FormHelperText, FormLabel, Heading, Input, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { baseUrl } from "../utils/constants";
import rootStore from "../rootStore";

const {userStore} = rootStore
    interface FormData {
        name: string;
        price: string;
        description: string;
        image: string;
    }
    interface Validation {
        price: string;
    }

    

export async function addProductActionDialog({ request }: { request: Request}) {
    
    
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { name, price, description } = userInfo;
    let {image} = userInfo
    if(image === "")
        image = "none";
    const requestData = {
        name, 
        price,
        description,
        image 
    };
    const validationResult = addingProductValidator( price.toString()) 
    if(validationResult.price === '')
    {
        try {
            await axios.post(`${baseUrl}/product`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${userStore.userJwt}`
                }
            });

            onclose
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }
    else{
        return redirect(`/add-product`);
    }
    
}

export function AddProductCopy() {

    useEffect(() => {
        if(!userStore.isAdmin)
        {
            redirect("/error")
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

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <Box>

            <Button m="5px"  onClick={onOpen}>
                add something
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Add product properties
                    </AlertDialogHeader>

                    <AlertDialogBody>
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
                                
                                <Button mb="50px" colorScheme="red" id="btnSubmit" type="submit" onClick={validate}>Submit</Button>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                        </Form>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Box>
    )
}
