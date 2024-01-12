import { Box, List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import {StarIcon} from "@chakra-ui/icons"
import { PayPalScriptProvider, PayPalButtons, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";

function ShoppingCart() {

    const initialOptions = {
        "client-id": "AaKXRba20vN70xXrB23ZafBFshL927Uu-VRXD_SunL3C99We7mddrFGuCoKmUGrISogMCB0Fm-CKwm1O",
        currency: "ILS",
        intent: "capture"
    };

    const token = localStorage.getItem('token')

    return (
        <>
            <Tabs mt="20px" p="20px" colorScheme="red" variant="enclosed">
                <TabList>
                    <Tab _selected={{color: "white", bg:"red.600"}}>Shopping Cart</Tab>
                    <Tab _selected={{color: "white", bg:"red.600"}}>Purches History</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <List spacing = {4}>
                            <ListItem >
                                <ListIcon as={StarIcon}/>
                                product 1 - 5 ₪
                            </ListItem>
                            <ListItem>product 2- 5 ₪</ListItem>
                            <ListItem>product 3- 5 ₪</ListItem>
                            <ListItem as="h1" p="10px" fontWeight="bold" bg="red.200"> Total of 15 ₪</ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel>
                        {token?
                        (
                            <List spacing = {4}>
                                <ListItem>product 1</ListItem>
                                <ListItem>product 2</ListItem>
                                <ListItem>product 3</ListItem>
                            </List>
                        ):
                        (
                            <Text fontWeight="bold"> Accessably to registered users only</Text>
                        )}
                        
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Box mb="30px">
                
            </Box>
            <PayPalScriptProvider loadingStatus={SCRIPT_LOADING_STATE.RESOLVED} options={initialOptions}>
                <PayPalButtons />
            </PayPalScriptProvider> 
                
        </>
    )
}

export default ShoppingCart