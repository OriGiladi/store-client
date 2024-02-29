import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import rootStore from '../rootStore'
import OrderItem from './OrderItem'
const { orderStore } = rootStore

function OrderHistory() {
    return (
        <>
            {orderStore.userOrders.length > 0 ?
            (   <Box mb={10}>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                        <Tr>
                            <Th>Product</Th>
                            <Th>Date</Th>
                            <Th>Qty</Th>
                            <Th isNumeric>Price</Th>
                            <Th isNumeric>Total</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {orderStore.userOrders.map((order, index) => (
                            <Tr key={index}>
                                <Td>
                                    <OrderItem order={order}/>
                                </Td>
                                <Td>{order.createdAt.getDate()}/{order.createdAt.getMonth() + 1}/{order.createdAt.getFullYear()}</Td>  
                                <Td>{order.quantity}</Td>
                                <Td isNumeric>
                                { Number(order.product.price)} ₪
                                </Td>
                                <Td isNumeric> { Number(order.product.price) * order.quantity} ₪</Td>
                            </Tr>
                        ))}
                        </Tbody>
                        <Tfoot>
                        <Tr>
                            <Th>Product</Th>
                            <Th>Date</Th>
                            <Th>Qty</Th>
                            <Th isNumeric>Price</Th>
                            <Th isNumeric>Total</Th>
                        </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>) : (<Text> No orders yet</Text> )}
        </>
    )
}

export default OrderHistory