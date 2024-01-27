import { useState } from 'react'
import emailjs from '@emailjs/browser';
import { Text } from '@chakra-ui/react';
import { emailJsServiceId, emailJsPublicKey, emailJsTemplateId } from '../utils/constants';
import ForgotPasswordForm from './ForgotPasswordForm';
const ForgotPassword = ( { email }: { email: string } ) => {
    const [isMessageSent, setIsMessageSent] = useState(false)
    const [generatedConfirmationCode, setGeneratedConfirmationCode] = useState<number | undefined>(0)
    const generateConfirmationCode = () => {
        const confimedcode =  Math.round(Math.random() * 1000000)
        setGeneratedConfirmationCode(confimedcode)
        return confimedcode
    }
    const sendPasswordResetEmail = async () => {
        const mailParams = {
            verification_code: `${generateConfirmationCode()}`,
            to_email: 'ori.g@circ.zone',
        }
        emailjs.send(emailJsServiceId, emailJsTemplateId, mailParams, emailJsPublicKey)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.error(error.text);
        });
        setIsMessageSent(true)
    }
        return (
            <>
                <Text 
                onClick={() => { sendPasswordResetEmail() } }
                textAlign={'left'}
                color="blue" 
                _hover={{ cursor: 'pointer' }}>
                    Forgot your password?
                </Text>
                { isMessageSent ? 
                ( <ForgotPasswordForm 
                    email={email} 
                    isOpen={true} 
                    generatedConfirmationCode={generatedConfirmationCode as number}/> ) : 
                ( null )}
            </>  
        )   
}
export default ForgotPassword