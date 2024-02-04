import { Box, Button, Card, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { NavLink, redirect, useLoaderData } from "react-router-dom";
import { AddIcon} from '@chakra-ui/icons'

interface Product{
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
}

interface LoadedData {
    data: Product 
}

export function Product() {

    const loaded: LoadedData  = useLoaderData() as LoadedData 
    const product: Product  = loaded.data;

    if(!product)
    {
        redirect('/')
    }

    return (
        <Card borderTop="8px" borderColor="red.400" bg="white" width="max">
            <CardHeader>
                <Flex gap={5}>
                    <Box boxSize="sm" p="20px" borderRight="4px" borderColor="red.300">
                        <Image src={product.image} />
                    </Box>
                    
                    <Box w="150px" h="50px">
                        <Heading mb="40px" size="xl" as='h3' >{product.name}</Heading>
                        <Box>
                            <Text mb="40px" color="gray.500"  size="lg">{product.description}</Text>
                            <Text mb="40px" color="black.500" size="lg">{product.price} ILS</Text>
                            <Button size="sm" colorScheme="red" mb="20px" ><NavLink to='/cart'> Buy This Product </NavLink> </Button>
                            <Button size="sm"   colorScheme="red" leftIcon={<AddIcon/>}> Add To Cart </Button>
                        </Box>
                    </Box>
                </Flex>
            </CardHeader>
        </Card>
    )
}
