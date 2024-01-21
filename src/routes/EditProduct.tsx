import { useState, ChangeEvent, useEffect } from "react";
import { Form, redirect, useLoaderData} from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { addingProductValidator } from "../validators/product";
import { Avatar, Box, Button,  FormControl, FormHelperText, FormLabel, HStack, Heading, Input } from "@chakra-ui/react";
import { baseUrl } from "../utils/constants";
import rootStore from "../rootStore";
const { userStore, productStore } = rootStore

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

function extractProductIdFromUrl(url: string): string | null { // TODO: move to utils
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return lastSegment || null;
}

export async function editProductAction({ request }: { request: Request }) {
    // const loader = useLoaderData()
    const productId = extractProductIdFromUrl(window.location.href)
    const data = await request.formData()
    const userInfo = Object.fromEntries(data);
    const { name, price, description, image } = userInfo;

    const requestData = {
        name, 
        price,
        description,
        image ,
    };
    const validationResult = addingProductValidator(price.toString()) 
    if(validationResult.price === '')
    {
        try {
            await axios.patch(`${baseUrl}/product/${productId}`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${userStore.userJwt}`
                }
            });
            productStore.setAllProducts(await productStore.loadAllProducts()) // saving the edited product in productStore by reloading all the products
            return redirect("/");
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }
    else{
        return redirect(`/edit-product/${productId}`);
    }
    
}
    
export function EditProduct() {
    const [productId, setProductId] = useState("")
    useEffect(() => {
        setProductId(extractProductIdFromUrl(window.location.href) as string)
        if(!userStore.isAdmin)
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
            
            <Button mb="50px" colorScheme="red" id="btnSubmit" type="submit" onClick={validate}>Edit</Button>
        </Form>
    </Box>
    )
}
