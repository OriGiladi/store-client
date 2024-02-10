import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import rootStore from '../../rootStore'
const { shoppingCartStore, userStore } = rootStore 
export const Cart = () => (
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
                    <Link href='/' color={mode('pink.500', 'pink.200')}>Continue shopping</Link>
                </HStack>
            ) : (
                <HStack mt="6" fontWeight="semibold">
                    <Link href='/' color={mode('pink.500', 'pink.200')}>Continue shopping</Link>
                </HStack>
            )}
        </Flex>
    </Stack>
    </Box>
)