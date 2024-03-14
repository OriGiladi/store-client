import { useState, ChangeEvent } from "react";
import { Form } from "react-router-dom";
import { productProperties, productValidator } from "../../validators/product";
import {  Box, Button,  Flex,  FormControl, FormHelperText, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { observer } from "mobx-react";
    interface FormData {
        name: string;
        price: string;
        description: string;
        image: string
    }

export const AddProduct = observer(() => {

    const [validationResult, setValidationResult] = useState<productProperties>({
        name: "",
        price: "",
        description: "",
        image: ""
    });

    const validate = () =>{
        setValidationResult( 
            productValidator({
                name: formData.name.toString(),
                price: formData.price.toString(),
                description: formData.description.toString(),
                image: formData.image.toString()
            })
        )
    }

    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: "",
        description: "",
        image: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Flex justifyContent={"center"}>
            <Box className="container">
                <Heading size="lg" mb="20px"> Add product properties</Heading>
            <Form method="post" action="/add-product">
                    <FormControl mb="40px">
                        <FormLabel> Product Name:</FormLabel>
                        <Input type="text"
                        name="name"
                        onChange={handleChange}/>
                        <FormHelperText color="pink.500">{validationResult.name}</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Price:</FormLabel>
                        <Input type="text"
                        name="price"
                        onChange={handleChange}/>
                        <FormHelperText color="pink.500">{validationResult.price}</FormHelperText>
                    </FormControl>

                    <FormControl mb="40px">
                        <FormLabel> Description:</FormLabel>
                        <Textarea
                        name="description"
                        onChange={handleChange}/>
                        <FormHelperText color="pink.500">{validationResult.description}</FormHelperText>
                    </FormControl>
                    
                    <FormControl mb="40px">
                        <FormLabel> Image URL :</FormLabel>
                        <Textarea
                        name="image"
                        onChange={handleChange}/>
                        <FormHelperText color="pink.500">{validationResult.image}</FormHelperText>
                    </FormControl>
                    <Box textAlign={"center"}>
                        <Button mb="50px" colorScheme="pink" id="btnAddProduct" type="submit" onClick={validate}>Submit</Button>
                    </Box>
                </Form>
            </Box>
        </Flex>
    )
})


