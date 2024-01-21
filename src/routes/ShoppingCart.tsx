import { Avatar, Box, Button, Card, Flex, Heading, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon} from '@chakra-ui/icons'
import { PayPalScriptProvider, PayPalButtons, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";
import rootStore from "../rootStore";
import { Suspense, useEffect, useState } from "react";

function ShoppingCart() {
    const initialOptions = { // TODO: move paypal to a different component
        "client-id": "AaKXRba20vN70xXrB23ZafBFshL927Uu-VRXD_SunL3C99We7mddrFGuCoKmUGrISogMCB0Fm-CKwm1O",
        currency: "ILS",
        intent: "capture"
    };
    const { userStore, shoppingCartStore } = rootStore;
    const [isShoppingCartLoaded, setShoppingCartLoaded] = useState(false) // makes sure that the shoppingCartItemsWithAmounts is displayed only when the loading is done 
    useEffect(() => {
        shoppingCartStore.setShoppingCartItemsWithAmounts();
        setShoppingCartLoaded(true);
    }, [shoppingCartStore]);
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
                        shoppingCartStore.shoppingCartItemsWithAmounts.length > 0 ? (
                            <>
                                {shoppingCartStore.shoppingCartItemsWithAmounts.map((shoppingCartItem) => (
                                    <Card mb={15} padding={3}>
                                        <Flex gap={15}>
                                            <Avatar src={shoppingCartItem.image} />
                                            <Box w="150px" h="50px">
                                                <Heading as="h3" mb="10px" size="sm">
                                                    {shoppingCartItem.name}
                                                </Heading>
                                                <Heading as="h3" size="sm">
                                                    {shoppingCartItem.price} ₪
                                                </Heading>
                                            </Box>
                                            <Box>
                                                <Text as="h1" p="10px">
                                                    x {shoppingCartItem.amount}
                                                </Text>
                                            </Box>
                                            {/* <Box>
                                                <Button margin="-10" size="sm" leftIcon={<AddIcon/>}></Button>
                                                <Button margin="-10" size="sm" leftIcon={<MinusIcon/>}></Button>
                                            </Box> */}
                                        </Flex>
                                    </Card>
                                ))}
                                <Text as="h1" p="10px" fontWeight="bold" bg="red.200">
                                    Total Price: {shoppingCartStore.sumTotalPrice()}  ₪
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
            {userStore.userJwt && shoppingCartStore.shoppingCartItemsWithAmounts.length > 0  ? (
               <Suspense fallback={<div>Loading...</div>}> {/* TODO: make it work properly */}
                    <PayPalScriptProvider loadingStatus={SCRIPT_LOADING_STATE.RESOLVED} options={initialOptions}>
                        <PayPalButtons />
                    </PayPalScriptProvider>
                </Suspense>
            ) : shoppingCartStore.shoppingCartItemsWithAmounts.length > 0 ? (
                <Text fontWeight="bold">Perchusing is accessible to registered users only</Text>
            ) : (null)}
        </>
    );
}

export default ShoppingCart;
