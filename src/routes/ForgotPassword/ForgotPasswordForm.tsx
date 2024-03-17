import { Button, Text, Input, useToast, HStack, PinInput, PinInputField } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Form } from 'react-router-dom';
import { LoginRequest } from '../../utils/types';

const ForgotPasswordForm = ({ email, generatedConfirmationCode } : { email: string, generatedConfirmationCode: number }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmationCodeCorrect, setIsConfirmationCodeCorrect] = useState(false);
    const toast = useToast();
    const [formData, setFormData] = useState<LoginRequest>({ 
        email: email,
        password: ""
    });
    const handleConfirmationCodeChange = (event: string) => {
        setConfirmationCode(event); 
    }
    const validateConfirmationCode = () => {
        if(Number(confirmationCode) === generatedConfirmationCode)
        {
            toast({
                title: "Confirmation code verified",
                duration: 5000,
                isClosable: true,
                status: "success",
                position: "top",
            });
            setIsConfirmationCodeCorrect(true)
        }
            
        else{
            toast({
                title: "This is not the right confirmation code",
                duration: 5000,
                isClosable: true,
                status: "error",
                position: "top",
            });
        }
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
        {!isConfirmationCodeCorrect ? 
            (
                <>
                    <Text mb={30}> A verification code was sent to {email}</Text>
                    <HStack>
                        <PinInput 
                        value={confirmationCode}
                        onChange={handleConfirmationCodeChange}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                    <Button mt={30} colorScheme='pink' onClick={() => validateConfirmationCode()} ml={3}>
                        Confirm
                    </Button>
                </>
            ) :
            (<>
                <Form method="post" id="forgot-password-form" action={`/forgot-password`}>
                    <Text mb={30}> Enter your new password:</Text>
                    <Input
                        type="text"
                        name='password'
                        value={formData.password}
                        onChange={handlePasswordChange}
                        mb={30}
                    />
                    <Button colorScheme='pink' ml={3} type='submit'>
                        Save
                    </Button>
                </Form>
            </>)
            }      
        </>
    )
}
export default ForgotPasswordForm