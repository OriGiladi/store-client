import { Button, Text, Input, useToast } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Form } from 'react-router-dom';
import { LoginRequest } from '../utils/constants';

const ForgotPasswordForm = ({ email, generatedConfirmationCode } : { email: string, generatedConfirmationCode: number }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmationCodeCorrect, setIsConfirmationCodeCorrect] = useState(false);
    const toast = useToast();
    const [formData, setFormData] = useState<LoginRequest>({ 
        email: email,
        password: ""
    });
    const handleConfirmationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputCode = event.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
        setConfirmationCode(inputCode.slice(0, 6)); // Limit to 6 characters
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
                    <Input
                        type="text"
                        placeholder="Enter the code here"
                        value={confirmationCode}
                        onChange={handleConfirmationCodeChange}
                        maxLength={6}
                        inputMode="numeric"
                        mb={30}
                    />
                    <Button colorScheme='red' onClick={() => validateConfirmationCode()} ml={3}>
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
                    <Button colorScheme='red' ml={3} type='submit'>
                        Save
                    </Button>
                </Form>
            </>)
            }      
        </>
    )
}
export default ForgotPasswordForm