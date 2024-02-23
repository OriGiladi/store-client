import { Box, HStack, Icon, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import {StarIcon} from "@chakra-ui/icons"
import React from 'react'
import { Product } from '../../../rootStore/ProductStore'
import { useToast } from '@chakra-ui/react'
import rootStore from '../../../rootStore'
import RatingDialog from './RatingDialog'
import { ratingConstants } from './constants.enum'

const { userStore, productStore } = rootStore

export const Rating = ({defaultValue,  product}:{defaultValue: number, product: Product}) => {
    const { isOpen, onOpen, onClose } : {
        isOpen: boolean;
        onClose: () => void;
        onOpen: () => void
    } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)
    const color = useColorModeValue('gray.200', 'gray.600')
    const activeColor = useColorModeValue('pink.500', 'pink.200')
    const toast = useToast()

    function checkIfRated(): void {
        const rated = productStore.isRatedByTheUser(product, userStore.user?._id as string)
        if(rated){
            toast({
                title: "You already rated this product",
                duration: 5000,
                isClosable: true,
                status: "error",
                position: "top",
            });
        }
        else{
            onOpen()
        }
    }

    return (
        <>
            <Tooltip label={userStore.user ? 'Rate this product' : 'Rating is avalable to registered users only'}>
                <Box>
                    <HStack spacing="0.5" _hover={{ cursor: 'pointer' }} 
                    onClick={userStore.user ? () => { checkIfRated() } : undefined}>
                        {Array.from({ length: ratingConstants.MAX_STARS as number })
                            .map((_, index) => index + 1)
                            .map((index) => (
                            <Icon
                                key={index}
                                as={StarIcon}
                                fontSize={ratingConstants.SIZE}
                                color={index <= defaultValue ? activeColor : color}
                            />
                        ))}
                    </HStack>
                    <RatingDialog product={product} isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}/>
                </Box>
            </Tooltip>
        </>
    )
}