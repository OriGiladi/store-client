import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, HStack, Icon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import {StarIcon} from "@chakra-ui/icons"
import React, { useState } from 'react'
import { Product } from '../../rootStore/ProductStore'
import { useToast } from '@chakra-ui/react'
import rootStore from '../../rootStore'

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
    const maxStars = 5 // TODO: move it to a constant file
    const size = 'md' // TODO: move it to a constant file
    const toast = useToast()
    const [ inputRating, setInputRating ] = useState(1)
    function handleRatingProduct(): void {
        productStore.addRating(product, inputRating, userStore.user?._id as string)
        toast({ 
            title: "Thanks for rating",
            duration: 5000,
            isClosable: true,
            status: "success",
            position: "top",
        });
        onClose()
    }
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
                        {Array.from({ length: maxStars })
                            .map((_, index) => index + 1)
                            .map((index) => (
                            <Icon
                                key={index}
                                as={StarIcon}
                                fontSize={size}
                                color={index <= defaultValue ? activeColor : color}
                            />
                        ))}
                    </HStack>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                How much do you rate this product from 1-5? 
                                <br/>
                                <br/>
                                <NumberInput 
                                defaultValue={inputRating} 
                                min={1} max={5}
                                clampValueOnBlur={true}
                                allowMouseWheel={false} 
                                keepWithinRange={true} 
                                onChange={(inputRating) => setInputRating(Number(inputRating))}
                                value={inputRating}>
                                <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='pink' onClick={() => handleRatingProduct()} ml={3}  type="submit">
                                    Rate
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Box>
            </Tooltip>
        </>
    )
}