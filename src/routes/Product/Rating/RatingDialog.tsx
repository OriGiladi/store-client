import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import rootStore from '../../../rootStore';
import { Product } from '../../../rootStore/ProductStore';
const {userStore, productStore} = rootStore;
function RatingDialog({product, isOpen, onClose, cancelRef}: 
    {product: Product, isOpen: boolean, onClose: () => void, cancelRef: React.RefObject<HTMLButtonElement>}) {
    const [ inputRating, setInputRating ] = useState(1)
    const toast = useToast()
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

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
        <AlertDialogOverlay>
            <AlertDialogContent>
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
    )
}

export default RatingDialog