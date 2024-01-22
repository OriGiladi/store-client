import { Avatar, Box, Button, Card, Flex, Heading, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon} from '@chakra-ui/icons'
import { PayPalScriptProvider, PayPalButtons, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";
import rootStore from "../rootStore";
import { Suspense, useEffect, useState } from "react";
import { ShoppingCartItem } from "../rootStore/ShoppingCartStore";
import { observer } from "mobx-react-lite";

export const ShoppingCart = observer(() => {
    const initialOptions = { // TODO: move paypal to a different component
        "client-id": "AaKXRba20vN70xXrB23ZafBFshL927Uu-VRXD_SunL3C99We7mddrFGuCoKmUGrISogMCB0Fm-CKwm1O",
        currency: "ILS",
        intent: "capture"
    };
    const { userStore, shoppingCartStore } = rootStore;
    const [isShoppingCartLoaded, setShoppingCartLoaded] = useState(false) // makes sure that the shoppingCartItems is displayed only when the loading is done 

    useEffect(() => {
        setShoppingCartLoaded(true);
    }, [shoppingCartStore]);

        function addItemToShoppingCart(productName: string, productPrice: string, ProductImage: string): void {
            const shoppingCartItem: ShoppingCartItem = {
                name: productName,
                price: productPrice,
                image: ProductImage
            }
            shoppingCartStore.addProductToCart(shoppingCartItem)
        }

    function removeProductFromCart(productName: string, productPrice: string, ProductImage: string) {
        const shoppingCartItem: ShoppingCartItem = {
            name: productName,
            price: productPrice,
            image: ProductImage
        }
        shoppingCartStore.removeProductFromCart(shoppingCartItem)
    }

    return (
        <>
            <Tabs mt="20px" mb="30px" p="20px" colorScheme="red" variant="enclosed">
                <TabList>
                    <Tab _selected={{ color: "white", bg: "red.600" }}>Shopping Cart</Tab>
                    <Tab _selected={{ color: "white", bg: "red.600" }}>Purchase History</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>  
                        {isShoppingCartLoaded ?
                        shoppingCartStore.shoppingCartItems.length > 0 ? (
                            <>
                                {shoppingCartStore.shoppingCartItems.map((shoppingCartItem) => (
                                    <Card mb={15} padding={3}>
                                        <Flex gap={15}>
                                            <Avatar src={shoppingCartItem.item.image} />
                                            <Box w="150px" h="50px">
                                                <Heading as="h3" mb="10px" size="sm">
                                                    {shoppingCartItem.item.name}
                                                </Heading>
                                                <Heading as="h3" size="sm">
                                                    {shoppingCartItem.item.price} ₪
                                                </Heading>
                                            </Box>
                                            <Box>
                                                <Text as="h1" pt="10px">
                                                    x {shoppingCartItem.quantity}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Button mt="10px" 
                                                onClick={() => {
                                                    addItemToShoppingCart(
                                                        shoppingCartItem.item.name,
                                                        shoppingCartItem.item.price,
                                                        shoppingCartItem.item.image
                                                        )}}
                                                        ml={15} 
                                                        size="sm">
                                                        <AddIcon/>
                                                </Button>
                                                <Button 
                                                mt="10px" 
                                                onClick={() => {
                                                    removeProductFromCart(
                                                        shoppingCartItem.item.name, 
                                                        shoppingCartItem.item.price, 
                                                        shoppingCartItem.item.image)}} 
                                                        ml={15} 
                                                        size="sm">
                                                            <MinusIcon/>
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </Card>
                                ))}
                                <Text as="h1" p="10px" fontWeight="bold" bg="red.200">
                                    Total Price: {shoppingCartStore.totalPrice}  ₪
                                </Text>
                            </>
                        ) : (
                            <Text fontWeight="bold">
                                You didn't add any items to your cart
                            </Text>
                        ) : ( <Text fontWeight="bold">
                            Loading...
                    </Text>)}
                    </TabPanel>
                    <TabPanel>
                        {userStore.userJwt ? (
                            <List spacing={4}>
                                <ListItem>product 1</ListItem>
                                <ListItem>product 2</ListItem>
                                <ListItem>product 3</ListItem>
                            </List>
                        ) : (
                            <Text fontWeight="bold">Accessible to registered users only</Text>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {userStore.userJwt && shoppingCartStore.shoppingCartItems.length > 0  ? (
               <Suspense fallback={<div>Loading...</div>}> {/* TODO: make it work properly */}
                    <PayPalScriptProvider loadingStatus={SCRIPT_LOADING_STATE.RESOLVED} options={initialOptions}>
                        <PayPalButtons />
                    </PayPalScriptProvider>
                </Suspense>
            ) : shoppingCartStore.shoppingCartItems.length > 0 ? (
                <Text fontWeight="bold">Perchusing is accessible to registered users only</Text>
            ) : (null)}
        </>
    );
})


