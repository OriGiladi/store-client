import { useState } from 'react'
import emailjs from '@emailjs/browser';
import { Button, Text } from '@chakra-ui/react';
import { emailJsServiceId, emailJsPublicKey, emailJsTemplateId } from '../utils/constants';
function ForgotPassword() {
    const [isMessageSent, setIsMessageSent] = useState(false)
    const generateRandomPassword = () => {
        return Math.round(Math.random() * 1000000)
    }
    const sendPasswordResetEmail = async () => {
        const mailParams = {
            verification_code: `${generateRandomPassword()}`,
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
                <Button onClick={() => { sendPasswordResetEmail() } }>send a test email</Button>
                { isMessageSent ? 
                (<Text> Check your email</Text>) : 
                (null)}
            </>  
        )   
}
export default ForgotPassword