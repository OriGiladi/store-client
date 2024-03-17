import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, LightMode, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon} from '@chakra-ui/icons'
import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import rootStore from '../../rootStore';
import { getHeadersWithJwt } from '../../utils/sdk';
interface Product{
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
}
export function DeleteProductBtn({product}: {product: Product}) {
    const { isOpen, onOpen, onClose } : {
        isOpen: boolean;
        onClose: () => void;
        onOpen: () => void
    } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)
    const onDelete = async (id: string) => {
        const { userStore, productStore} = rootStore
        try {
            await axios.delete(`${BASE_URL}/product/${id}`, {
                headers: getHeadersWithJwt(userStore.userJwt as string)
            });
            productStore.setAllProducts(await productStore.loadAllProducts()) // saving the deleted product in productStore by reloading all the products
            onClose()
            return { response: true, data: "succeeded" };
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }

    return (
        <>
            <LightMode>
                <IconButton
                onClick={onOpen}
                isRound
                position="absolute"
                top="4"
                right="4"
                bg="white"
                color="gray.900"
                size="sm"
                _hover={{ transform: 'scale(1.1)' }}
                sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
                transition="all 0.15s ease"
                icon={<DeleteIcon/>} // Use Icon component and pass FontAwesomeIcon as 'as' prop
                boxShadow="base"
                aria-label="Delete"
                />
        </LightMode>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Product
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={() =>onDelete(product._id)} ml={3}  type="submit">
                            Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
        
    )
}

