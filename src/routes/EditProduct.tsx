import { useState, ChangeEvent, useEffect } from "react";
import { Form, redirect, useLoaderData} from "react-router-dom";
import { addingProductValidator } from "../validators/product";
import { Avatar, Box, Button,  Flex,  FormControl, FormHelperText, FormLabel, HStack, Heading, Input } from "@chakra-ui/react";
import rootStore from "../rootStore";
import { extractParameterFromUrl } from "../utils/sdk";
import { userRole } from "../utils/constants";
const { userStore } = rootStore

interface FormData {
    name: string;
    price: string;
    description: string;
    image: string;
}
interface Validation {
    price: string;
}
interface Product{
    name: string,
    price: string,
    description: string,
    image: string
}

interface LoadedData {
    data: Product 
}
    
export function EditProduct() {
    const [productId, setProductId] = useState("")
    useEffect(() => {
        setProductId(extractParameterFromUrl(window.location.href) as string)
        if(userStore.userRole !== userRole.admin)
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
        <Flex justifyContent={"center"}>
            <Box className="container">
                <Heading size="lg" mb="20px"> Edit product properties</Heading>
                <Form method="post" action={`/edit-product/${productId}`}>
                    <FormControl mb="40px">
                        <FormLabel> Product Name:</FormLabel>
                        <Input type="text"
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
                        <FormHelperText color="pink.500">{validationResult.price}</FormHelperText>
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
                    <Box textAlign={"center"}>
                        <Button mb="50px" colorScheme="pink" padding={5} id="btnEditProduct" type="submit" onClick={validate}>Edit</Button>
                    </Box>
                </Form>
            </Box>
        </Flex>
    )
}
