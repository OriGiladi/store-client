import { Box, Button, Flex, Image,} from '@chakra-ui/react'
import { ProductCard } from './ProductCard'
import rootStore from '../../rootStore'
import { ProductGrid } from './ProductGrid'
import { useLoaderData } from 'react-router'
import { Product } from "../../rootStore/ProductStore";
import { observer } from 'mobx-react'
import { userRole } from '../../utils/constants'
import { useNavigate } from "react-router-dom";
import wristWondersLogo from '../../../dist/wrist-wonders-logo.svg';
const { productStore, userStore } = rootStore
interface LoadedData {
    data: Product []
}

const Dashboard = observer(() => {
    const navigate = useNavigate()
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
    function addProductNavigation() {
        navigate('/add-product')
    }
    
    return (
        <>
            <Flex justifyContent={"center"}>
                <Image width={400} height={130} mb={20} src={wristWondersLogo}></Image>
            </Flex>
            {userStore.userRole === userRole.admin ? (
                <Flex justifyContent="center" alignItems="center">
                    <Button colorScheme="pink" className='addProductBtn' m="5px" onClick={() => { addProductNavigation()}}>
                            Add a new product
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

