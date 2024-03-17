import { Table, Thead, Tbody, Tr, Th, Td } from "../../Table";
import { Box, Text, TableContainer, Heading } from '@chakra-ui/react'
import rootStore from '../../rootStore'
import OrderItem from './OrderItem'
const { orderStore } = rootStore

function OrderHistory() {
    return (
        <>
            <Heading textAlign="center" my='30' p="10px"> Your Order History </Heading>
            {orderStore.userOrders.length > 0 ?
            (   <Box mb={10}>
                <TableContainer>
                    <Table size='sm' className='responsiveTable'>
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
                                <Td><OrderItem order={order}/></Td>
                                <Td>{order.createdAt.getDate()}/{order.createdAt.getMonth() + 1}/{order.createdAt.getFullYear()}</Td>  
                                <Td>{order.quantity}</Td>
                                <Td isNumeric>{ Number(order.product.price)} ₪</Td>
                                <Td isNumeric> { Number(order.product.price) * order.quantity} ₪</Td>
                            </Tr>
                        ))}
                        </Tbody>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Date</Th>
                                <Th>Qty</Th>
                                <Th isNumeric>Price</Th>
                                <Th isNumeric>Total</Th>
                            </Tr>
                        </Thead>
                    </Table>
                </TableContainer>
            </Box>) : (<Text> No didn't order anything yet</Text> )}
        </>
    )
}

export default OrderHistory