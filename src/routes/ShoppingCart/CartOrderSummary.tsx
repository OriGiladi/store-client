import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import rootStore from '../../rootStore'
import { observer } from "mobx-react";

import { paypalInitialOptions } from '../../utils/constants';
import { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Checkout from '../Checkout';
const { shoppingCartStore, userStore } = rootStore 

type OrderSummaryItemProps = {
    label: string
    value?: string
    children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
    const { label, value, children } = props
    return (
    <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
    )
}

export const CartOrderSummary = observer(() => {
    const [isPaypalDisplayed, setIsPaypalDisplayed] = useState(false)
    
    return (
        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
            <Heading size="md">Order Summary</Heading>

            <Stack spacing="6">
            <OrderSummaryItem label="Subtotal" value={`${(shoppingCartStore.totalPrice)} ₪`}  /> {/*value={formatPrice(shoppingCartStore.totalPrice)}*/}
            <OrderSummaryItem label="Shipping + Tax">
                <Link href="#" textDecor="underline">
                Calculate shipping
                </Link>
            </OrderSummaryItem>
            <OrderSummaryItem label="Coupon Code">
                <Link href="#" textDecor="underline">
                Add coupon code
                </Link>
            </OrderSummaryItem>
            <Flex justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                Total
                </Text>
                <Text fontSize="xl" fontWeight="extrabold">
                {(shoppingCartStore.totalPrice)} ₪
                </Text>
            </Flex>
            </Stack>
            {userStore.userJwt && shoppingCartStore.shoppingCartItems.length > 0 ? (
            <>
                <Button onClick={() => setIsPaypalDisplayed(!isPaypalDisplayed)} colorScheme="pink" size="lg" fontSize="md" rightIcon={<ChevronRightIcon />}>
                    Checkout
                </Button>
                
                <PayPalScriptProvider options={paypalInitialOptions}>
                    {isPaypalDisplayed && (
                        <Checkout />
                    )}
                </PayPalScriptProvider>
            </>
            ) : shoppingCartStore.shoppingCartItems.length > 0 ? (
                <Text fontWeight="bold">Purchasing is accessible to registered users only</Text>
            ) : (
                <Text fontWeight="bold">You didn't add any product to your cart</Text>
            )}    
        </Stack>
    )
})