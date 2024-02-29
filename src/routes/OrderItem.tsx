import { Flex, Stack } from '@chakra-ui/layout'
import { CartProductMeta } from './ShoppingCart/CartProductMeta'
import { order } from '../rootStore/OrderStore'


const OrderItem = ({order}: {order: order}) => {
    return (
        <>
            <Stack spacing="6">           
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
                        <CartProductMeta
                            name={order.product.name}
                            description={""}
                            // description={order.product.description}
                            image={order.product.image}
                            isGiftWrapping={true}
                        />
                    </Flex>
            </Stack>
        </>
    )
}

export default OrderItem