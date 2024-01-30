import { Suspense, useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { emailJsServiceId, emailJsPublicKey, emailJsTemplateId, baseUrl, authActionError } from '../utils/constants';
import ForgotPasswordForm from './ForgotPasswordForm';
import { LoaderFunction, redirect, useActionData } from 'react-router-dom';
import { registrationValidators } from '../validators/registrationValidators';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';
import rootStore from '../rootStore';
const {forgotPasswordStore} = rootStore

export async function forgotPasswordAction({ request }: { request: Request }) {
    const formData = await request.formData()
    const { password } = Object.fromEntries(formData);
    const requestBody = {
        email: forgotPasswordStore.email,
        password: password
    }
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
        return { message: validationResult.password } // displays the validation error
    }
}

const ForgotPassword = () => {
    const [isUserExist, setIsUserExist] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [generatedConfirmationCode, setGeneratedConfirmationCode] = useState<number | undefined>(0);
    const isFirstRender = useRef(true);
    const errorInAction: authActionError = useActionData() as authActionError // returns the error in the action if occurs
    
    const generateConfirmationCode = () => {
        let isSixFigure = false;
        let confirmedCode;
        while (!isSixFigure) {
            confirmedCode = Math.round(Math.random() * 1000000); // TODO: replace 1000000 with a constant
            if (confirmedCode.toString().length === 6) {
                isSixFigure = true;
            }
        }
        setGeneratedConfirmationCode(confirmedCode);
        return confirmedCode;
    };

    useEffect(() => {
        if(forgotPasswordStore.isSuchUser){
            if (!isFirstRender.current) { // send the confirmation code
                const mailParams = {
                    verification_code: `${generateConfirmationCode()}`,
                    to_email: forgotPasswordStore.email,
                };
    
                emailjs.send(emailJsServiceId, emailJsTemplateId, mailParams, emailJsPublicKey)
                    .then((result) => {
                        console.log(result)
                        console.log(result.text);
                    })
                    .catch((error) => {
                        console.error(error.text);
                    });
                setIsMessageSent(true);
            } else {
                isFirstRender.current = false;
            }
        }
        setIsUserExist(forgotPasswordStore.isSuchUser as boolean)
    }, []);

    return (
        <>
        {isUserExist ? (
            <Suspense fallback={<div> Loading... </div>}>
                {isMessageSent ? (
                    <ForgotPasswordForm email={forgotPasswordStore.email as string} generatedConfirmationCode={generatedConfirmationCode as number} />
                ) : null}
                {errorInAction ? <Box mt={20} color="red.500">{errorInAction.message}</Box> : null}
            </Suspense>
        ) : (<Text color="red.500"> There is no user with this email</Text>)}
        </>
    );
};
export default ForgotPassword;

export const  forgotPassweordLoader: LoaderFunction = async () => {
    const res = await axios.post(`${baseUrl}/login/isSuchUser`, {email: forgotPasswordStore.email}, {
        headers: {
            'Content-Type': 'application/json'
        }})
    forgotPasswordStore.setIsSuchUser(res.data as boolean)
    return null
}