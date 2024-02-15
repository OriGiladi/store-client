import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from '../PriceTag'
import { CartProductMeta } from './CartProductMeta'
import rootStore from '../../rootStore'
import { observer } from "mobx-react";
import { ShoppingCartItem, ShoppingCartWithQuantity } from '../../rootStore/ShoppingCartStore'
const { shoppingCartStore } = rootStore
const QuantitySelect = (props: SelectProps) => {
    return (
        <Select
        maxW="64px"
        aria-label="Select quantity"
        focusBorderColor={useColorModeValue('pink.500', 'pink.200')}
        {...props}
        >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </Select>
    )
}

export const CartItem = observer(function ({shoppingCartItem}: {shoppingCartItem: ShoppingCartWithQuantity}) { 

    function onChangeQuantity(shoppingCartItem: ShoppingCartItem, quantity: number) {
        shoppingCartStore.ChangeQuantity(shoppingCartItem, quantity)
    }

    function onClickDelete(shoppingCartItem: ShoppingCartItem): void {
        shoppingCartStore.ChangeQuantity(shoppingCartItem, 0)
    }

    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
        <CartProductMeta
            name={shoppingCartItem.item.name}
            description={shoppingCartItem.item.description as string}
            image={shoppingCartItem.item.image}
            isGiftWrapping={true}
        />

        {/* Desktop */}
        <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
            <QuantitySelect
            value={shoppingCartItem.quantity} 
            onChange={(e) => {
                onChangeQuantity(shoppingCartItem.item, Number(e.currentTarget.value))
            }}
            />
            <PriceTag price={Number(shoppingCartItem.item.price)} currency={"ILS"} />
            <CloseButton aria-label={`Delete ${shoppingCartItem.item.name} from cart`} onClick={() => 
                { onClickDelete(shoppingCartItem.item)}} />
        </Flex>

        {/* Mobile */}
        <Flex
            mt="4"
            align="center"
            width="full"
            justify="space-between"
            display={{ base: 'flex', md: 'none' }}
        >
            <Link fontSize="sm" 
            textDecor="underline"
            onClick={() => { onClickDelete(shoppingCartItem.item)}}>
            Delete
            </Link>
            <QuantitySelect
            value={shoppingCartItem.quantity}
            onChange={(e) => {
                onChangeQuantity(shoppingCartItem.item, Number(e.currentTarget.value))
            }}
            />
            <PriceTag price={ Number(shoppingCartItem.item.price) } currency={"ILS"} />
        </Flex>
        </Flex>
    )
})