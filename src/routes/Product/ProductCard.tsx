import {
    AspectRatio,
    Box,
    Button,
    HStack,
    IconButton,
    Image,
    Link,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { Rating } from './Rating'
import { EditIcon } from '@chakra-ui/icons'
import { FavouriteButton } from './FavouriteButton'
import { PriceTag } from '../PriceTag'
import { Product } from '../../rootStore/ProductStore'
import rootStore from '../../rootStore'
import { ShoppingCartItem } from '../../rootStore/ShoppingCartStore'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router'
import { DeleteProductBtn } from '../DeleteProductBtn'
import { NavLink } from 'react-router-dom'
const { shoppingCartStore, userStore } = rootStore
interface Props {
    product: Product
    rootProps?: StackProps
}

export const ProductCard = observer((props: Props) => {
    const toast = useToast();
    const navigate = useNavigate()
    const { product, rootProps } = props
    const { name, image, price/*, salePrice, rating*/ } = product
    function addItemToShoppingCart(productName: string, productPrice: string, ProductImage: string, productDescription: string): void {
        const shoppingCartItem: ShoppingCartItem = {
            name: productName,
            price: productPrice,
            image: ProductImage,
            description: productDescription,
        }
        shoppingCartStore.addProductToCart(shoppingCartItem)
        toast({ // a popup that shows that the product has been added to the cart
            title: "Added to shopping cart",
            description: `${productName}`,
            duration: 5000,
            isClosable: true,
            status: "success",
            position: "bottom-left",
            colorScheme: 'pink'
        });
    }
    function quickShopTheProduct(productName: string, productPrice: string, ProductImage: string, productDescription: string): void {
        const shoppingCartItem: ShoppingCartItem = {
            name: productName,
            price: productPrice,
            image: ProductImage,
            description: productDescription,
        }
        shoppingCartStore.quickShop(shoppingCartItem)
        navigate('/cart')
    }

    return (
        <Stack spacing={{ base: '4', md: '5' }} {...rootProps}>
        <Box position="relative">
            <AspectRatio ratio={4 / 3}>
            <Image
                src={image}
                alt={name}
                draggable="false"
                fallback={<Skeleton />}
                borderRadius={{ base: 'md', md: 'xl' }}
            />
            </AspectRatio>
            {userStore.isAdmin ? (
                <>
                    <DeleteProductBtn product={product}/>
                    <IconButton
                        isRound
                        position="absolute"
                        top="4"
                        right="14"
                        bg="white"
                        color="gray.900"
                        size="sm"
                        _hover={{ transform: 'scale(1.1)' }}
                        sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
                        transition="all 0.15s ease"
                        boxShadow="base"
                        aria-label="Delete"
                        >
                        <NavLink to={`/edit-product/${product._id}`}>
                            <EditIcon/> 
                        </NavLink> 
                    </IconButton>
                </>
            ) : ( 
                <FavouriteButton
                position="absolute"
                top="4"
                right="4"
                aria-label={`Add ${name} to your favourites`}
                />
            )}
        </Box>
        <Stack>
            <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
                {name}
            </Text>
            <PriceTag price={Number(price)} /*salePrice={salePrice}*/ currency="ILS" />
            </Stack>
            <HStack>
            <Rating defaultValue={2} size="sm" />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                12 Reviews
            </Text>
            </HStack>
        </Stack>
        <Stack align="center">
            <Button 
            colorScheme="pink" 
            width="full"  
            onClick={() => addItemToShoppingCart(product.name, product.price, product.image, product.description)}>
            Add to cart
            </Button>
            <Link
            textDecoration="underline"
            fontWeight="medium"
            color={useColorModeValue('gray.600', 'gray.400')}
            onClick={() => quickShopTheProduct(product.name, product.price, product.image, product.description)}
            >
            Quick shop
            </Link>
        </Stack>
        </Stack>
    )
})