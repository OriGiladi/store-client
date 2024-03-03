import { Box, Button, Flex } from '@chakra-ui/react'
import { ProductCard } from './ProductCard'
import rootStore from '../../rootStore'
import { ProductGrid } from './ProductGrid'
import { useLoaderData } from 'react-router'
import { Product } from "../../rootStore/ProductStore";
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { userRole } from '../../utils/constants'
const { productStore, userStore } = rootStore
interface LoadedData {
    data: Product []
}

const Dashboard = observer(() => {
    const loaded: LoadedData  = useLoaderData() as LoadedData 
    let products: Product [] = []
    if(!productStore.allProducts)
    {
        productStore.setAllProducts(loaded.data)
        products = productStore.allProducts as unknown as Product []
    }
    else{
        products = productStore.allProducts
    }
    return (
        <>
        {userStore.userRole === userRole.admin ? (
            <Flex justifyContent="center" alignItems="center">
                <Button colorScheme="pink" className='addProductBtn' m="5px">
                    <NavLink to="/add-product" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Add a new product
                    </NavLink>
                </Button>
            </Flex>
        ): ( null )}
            <Box
            maxW="7xl"
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
            >
                <ProductGrid>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                </ProductGrid>
            </Box>
        </>
        
    )
})

export default Dashboard

