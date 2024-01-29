import { Suspense, useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { emailJsServiceId, emailJsPublicKey, emailJsTemplateId, baseUrl, authActionError } from '../utils/constants';
import ForgotPasswordForm from './ForgotPasswordForm';
import { redirect, useActionData, useParams } from 'react-router-dom';
import { registrationValidators } from '../validators/registrationValidators';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

function extractProductIdFromUrl(url: string): string | null { // TODO: move to utils
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return lastSegment || null;
}

export async function forgotPasswordAction({ request }: { request: Request }) {
    const email = extractProductIdFromUrl(window.location.href)
    const formData = await request.formData()
    const {password} = Object.fromEntries(formData);
    const requestBody = {
        email: email,
        password: password
    }
    console.log("@@", requestBody)
    const validationResult = registrationValidators("", "", "", requestBody.password as string) // TODO: create a password validation function
    if( validationResult.password === '' )
    {
        try {
            await axios.patch(`${baseUrl}/login`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return redirect("/login");
    
        } catch (error) {
            console.error(error);
            return {message: "There is a server error"}
        }
    }
    else{
        return {message: validationResult.password} // displays the validation error
    }
}

const ForgotPassword = () => {
    const { email } = useParams();
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [generatedConfirmationCode, setGeneratedConfirmationCode] = useState<number | undefined>(0);
    const isFirstRender = useRef(true);
    const errorInAction: authActionError = useActionData() as authActionError // returns the error in the action if occurs
    const generateConfirmationCode = () => {
        const confirmedCode = Math.round(Math.random() * 1000000);
        console.log("@@", confirmedCode);
        setGeneratedConfirmationCode(confirmedCode);
        return confirmedCode;
    };

    useEffect(() => {
        if (!isFirstRender.current) {
            const mailParams = {
                verification_code: `${generateConfirmationCode()}`,
                to_email: email,
            };

            emailjs.send(emailJsServiceId, emailJsTemplateId, mailParams, emailJsPublicKey)
                .then((result) => {
                    console.log(result.text);
                })
                .catch((error) => {
                    console.error(error.text);
                });

            setIsMessageSent(true);
        } else {
            isFirstRender.current = false;
        }
    }, [email]);

    return (
        <>
            <Suspense fallback={<div> Loading... </div>}>
                {isMessageSent ? (
                    <ForgotPasswordForm email={email as string} generatedConfirmationCode={generatedConfirmationCode as number} />
                ) : (null)}
            </Suspense>
            {errorInAction ? ( <Box>{ errorInAction.message }</Box>) : (null)}
        </>
    );
};

export default ForgotPassword;