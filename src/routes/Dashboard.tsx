import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import {  NavLink, useLoaderData } from "react-router-dom";
import {ViewIcon, AddIcon, EditIcon} from '@chakra-ui/icons'
import { DeleteProductBtn } from "./DeleteProductBtn";
import rootStore from "../rootStore";
import { observer } from "mobx-react";
import {ShoppingCartItem} from '../rootStore/ShoppingCartStore'
const {userStore, productStore, shoppingCartStore} = rootStore
import { Product } from "../rootStore/ProductStore";

interface LoadedData {
    data: Product []
}

export const Dashboard =  observer(() => {
    const toast = useToast();
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

    function addItemToShoppingCart(productName: string, productPrice: string, ProductImage: string): void {
        const shoppingCartItem: ShoppingCartItem = {
            name: productName,
            price: productPrice,
            image: ProductImage
        }
        shoppingCartStore.addProductToCart(shoppingCartItem)
        toast({ // a popup that shows that the product has been added to the cart
            title: "Added to shopping cart",
            description: `${productName}`,
            duration: 5000,
            isClosable: true,
            status: "success",
            position: "bottom-left"
        });
    }

    return (
        <SimpleGrid spacing={10} minChildWidth="300px">
            {userStore.isAdmin ? (
                <>
                    <Button bg="red.200" m="5px"><NavLink to="/add-product">Add a new product</NavLink>  
                    </Button>
                    {/* <AddProductCopy /> */}
                </>
            ) : ( null )}
            { products.map((product, index) => (
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
                                <Button bg="red.300" onClick={() => addItemToShoppingCart(product.name, product.price, product.image)} leftIcon={<AddIcon/>}> Add To Cart </Button>
                            </HStack>
                        </CardFooter>
                </Card>
            ))}
        </SimpleGrid>
    )
})
