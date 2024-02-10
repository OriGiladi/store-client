import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { ShoppingCartWithQuantity } from '../../rootStore/ShoppingCartStore'

// type CartItemProps = {
//     isGiftWrapping?: boolean
//     name: string
//     description: string
//     quantity: number
//     price: number
//     currency: string
//     imageUrl: string
//     onChangeQuantity?: (quantity: number) => void
//     onClickGiftWrapping?: () => void
//     onClickDelete?: () => void
// }

const QuantitySelect = (props: SelectProps) => {
    return (
        <Select
        maxW="64px"
        aria-label="Select quantity"
        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
        {...props}
        >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        </Select>
    )
}

export function CartItem ( {shoppingCartItem}: {shoppingCartItem: ShoppingCartWithQuantity}) {

    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
        <CartProductMeta
            name={shoppingCartItem.item.name}
            description={shoppingCartItem.item.description as string}
            image={shoppingCartItem.item.image}
            isGiftWrapping={true} // TODO: insert isGiftWrapping option
        />

        {/* Desktop */}
        <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
            <QuantitySelect
            value={shoppingCartItem.quantity} // ???
            // onChange={(e) => {
            //     onChangeQuantity?.(+e.currentTarget.value)
            // }}
            />
            <PriceTag price={Number(shoppingCartItem.item.price)} currency={"ILS"} />
            <CloseButton aria-label={`Delete ${shoppingCartItem.item.name} from cart`}/* onClick={onClickDelete}*/ />
        </Flex>

        {/* Mobile */}
        <Flex
            mt="4"
            align="center"
            width="full"
            justify="space-between"
            display={{ base: 'flex', md: 'none' }}
        >
            <Link fontSize="sm" textDecor="underline">
            Delete
            </Link>
            <QuantitySelect
            value={shoppingCartItem.quantity}
            // onChange={(e) => {
            //     onChangeQuantity?.(+e.currentTarget.value)
            // }}
            />
            <PriceTag price={ Number(shoppingCartItem.item.price) } currency={"ILS"} />
        </Flex>
        </Flex>
    )
}