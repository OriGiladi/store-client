import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon} from '@chakra-ui/icons'
import React from 'react'
import axios from 'axios';
import { baseUrl } from '../utils/constants';
import rootStore from '../rootStore';
interface Product{
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
}


export function DeleteBtn({product}: {product: Product}) {

    const { isOpen, onOpen, onClose } : {
        isOpen: boolean;
        onClose: () => void;
        onOpen: () => void
    } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)

    const onDelete = async (id: string) => {

        const {userStore} = rootStore

        try {
            await axios.delete(`${baseUrl}/product/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${userStore.userJwt}`
                }
            });
            onClose()
            return { response: true, data: "succeeded" };
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }

    return (
        <>
            <Button m="5px"  onClick={onOpen}>
                <DeleteIcon/>
            </Button>

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

