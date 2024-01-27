import { AlertDialog,
        AlertDialogBody, 
        AlertDialogContent, 
        AlertDialogFooter, 
        AlertDialogHeader, 
        AlertDialogOverlay, 
        Button,
        Text,
        Input,
        useDisclosure} 
        from '@chakra-ui/react'
import React from 'react';
import { ChangeEvent, useState } from 'react'

const ForgotPasswordForm = ({ email, isOpen, generatedConfirmationCode }:{ email: string, isOpen: boolean, generatedConfirmationCode:number }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isConfirmationCodeCorrect, setIsConfirmationCodeCorrect] = useState(false);
    const {  onClose } : {
        onClose: () => void;
    } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)
    const handleConfirmationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputCode = event.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
        setConfirmationCode(inputCode.slice(0, 6)); // Limit to 6 characters
    }
    const validateConfirmationCode = () => {
        if(Number(confirmationCode) === generatedConfirmationCode)
            setIsConfirmationCodeCorrect(true)
        else{
            alert('This is not the right confirmation code')
        }
    }

    return (
        <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Reset your password
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {!isConfirmationCodeCorrect ? 
                        (
                            <>
                                <Text mb={30}> A verification code was sent to {email}</Text>
                                <Input
                                    type="text"
                                    placeholder="Enter the code here"
                                    value={confirmationCode}
                                    onChange={handleConfirmationCodeChange}
                                    maxLength={6}
                                    inputMode="numeric"
                                />
                            </>
                        ) :
                        (<>
                            <Text mb={30}> Enter your new password:</Text>
                            <Input
                                type="text"
                                value={newPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                            <Button colorScheme='red'  ml={3}>
                                Save
                            </Button>
                        </>)
                        }   
                    </AlertDialogBody>
                    
                    <AlertDialogFooter>
                        <Button colorScheme='red' onClick={() => validateConfirmationCode()} ml={3}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ForgotPasswordForm