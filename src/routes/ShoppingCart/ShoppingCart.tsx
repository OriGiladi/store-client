import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
} from '@chakra-ui/react'
import { observer } from "mobx-react";
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import rootStore from '../../rootStore'
import { NavLink } from 'react-router-dom'


const { shoppingCartStore, userStore } = rootStore 
export const ShoppingCart = observer(() => (
    <Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
    >
    <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
    >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({shoppingCartStore.totalAmount} items)
        </Heading>

        <Stack spacing="6">
            {shoppingCartStore.shoppingCartItems.map((item) => (
            <CartItem  shoppingCartItem={ item } />
            ))}
        </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
        <CartOrderSummary />
        {userStore.userJwt && shoppingCartStore.shoppingCartItems.length > 0  ? (
                <HStack mt="6" fontWeight="semibold">
                    <p>or</p>
                    <NavLink to="/"
                    style={{
                    color: "#B83280",
                    textDecoration: 'none',
                    transition: 'color 0.15s ease-in-out',
                    }} >Continue shopping</NavLink>
                </HStack>
            ) : (
                <HStack mt="6" fontWeight="semibold">
                    <NavLink to="/"
                    style={{
                    color: "#B83280",
                    textDecoration: 'none',
                    transition: 'color 0.15s ease-in-out',
                    }} >Continue shopping</NavLink>
                </HStack>
            )}
        </Flex>
    </Stack>
    </Box>
))