import { Box, Text } from '@chakra-ui/react'
import rootStore from '../rootStore'
const {orderStore} = rootStore

function PurcahseHistory() {
    return (
        <>
            {
            orderStore.userOrders.length > 0 ? orderStore.userOrders.map((order,index) => (
                    <Box backgroundColor={"pink"} mb={10} key={index}>
                        <Text backgroundColor={"white"} mb={2}>{order.product.name}</Text>
                        <Text backgroundColor={"white"} mb={5}>{order.product.price}</Text>
                        <Text backgroundColor={"white"} mb={2}>{order.quantity}</Text>
                    </Box>
                )) : <Text>No orders yet</Text>
            }
        </>
    )
}

export default PurcahseHistory