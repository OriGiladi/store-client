import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import {  NavLink, useLoaderData } from "react-router-dom";
import {ViewIcon, AddIcon, EditIcon} from '@chakra-ui/icons'
import { DeleteProductBtn } from "./DeleteProductBtn";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import rootStore from "../rootStore";
import { observer } from "mobx-react";
const {userStore, productStore} = rootStore
interface Product{ // TODO: move it to a better place
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
}

interface LoadedData {
    data: Product []
}
export async function deleteProductAction({ request }: { request: Request }){
    const data = await request.formData()
    const userInfo = Object.fromEntries(data)
    const { id } = userInfo
    try {
        await axios.delete(`${baseUrl}/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${userStore.userJwt}`
            }
        });
        return { response: true, data: "succeeded" };
    } catch (error) {
        console.error(error);
        return { response: false, data: null };
    }
}

export const Dashboard =  observer(() => {
    const loaded: LoadedData  = useLoaderData() as LoadedData 
    let products: Product [] = []
    if(!productStore.allProducts)
    {
        productStore.setAllProducts(loaded.data)
        products = productStore.allProducts as unknown as Product []
    }
    else{
        products = productStore.allProducts
    }

    return (
        <SimpleGrid spacing={10} minChildWidth="300px">
            {userStore.isAdmin ?(
                <>
                    <Button bg="red.200" m="5px"><NavLink to="/add-product">Add a new product</NavLink>  
                    </Button>
                    {/* <AddProductCopy /> */}
                </>
            ) : ( null )}
            {(products as Product []).map((product, index) => (
                <Card key={index} borderTop="8px" borderColor="red.400" bg="white" p="15px">
                    {userStore.isAdmin ?(
                        <Flex justifyContent="end" >
                            <Button m="5px" >
                                <NavLink to={`/edit-product/${product._id}`}>
                                    <EditIcon/> 
                                </NavLink> 
                            </Button>
                            <DeleteProductBtn product={product}/>
                        </Flex>
                    ) : ( null )}

                    <CardHeader>
                        <Flex gap={5}>
                            <Avatar src={product.image}/>
                            <Box w="150px" h="50px">
                                <Heading as='h3' mb="10px" size="sm">{product.name}</Heading>
                                <Heading as='h3' size="sm">{product.price} ILS</Heading>
                            </Box>
                        </Flex>
                    </CardHeader>

                    <CardBody color='gray.500'>
                        <Text> {product.description} </Text>
                    </CardBody>

                    <Divider borderColor="gray.200"/>

                        <CardFooter>
                            <HStack>
                                <Button bg="red.300" leftIcon={<ViewIcon/>}> <NavLink to={ `/product/${product._id}`}>View</NavLink> </Button>
                                <Button bg="red.300" leftIcon={<AddIcon/>}> Add To Cart </Button>
                            </HStack>
                        </CardFooter>
                </Card>
            ))}

        </SimpleGrid>
    )
})

export async function productsLoader() {
    const res = await fetch(`${baseUrl}/product`)
    return res.json()
}
