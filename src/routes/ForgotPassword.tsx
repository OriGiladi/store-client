import { Suspense, useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_SERVICE_ID, EMAIL_JS_PUBLIC_KEY, EMAIL_JS_TEMPLATE_ID, BASE_URL, SIX_DIGIT_CONVERTOR, CONFIRMATION_CODE_LENGTH } from '../utils/constants';
import {authActionError } from '../utils/types';
import ForgotPasswordForm from './ForgotPasswordForm';
import { LoaderFunction, redirect, useActionData } from 'react-router-dom';
import { passwordValidator } from '../validators/registrationValidators';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';
import rootStore from '../rootStore';
import { getHeaders } from '../utils/sdk';
const {forgotPasswordStore} = rootStore

export async function forgotPasswordAction({ request }: { request: Request }) {
    const formData = await request.formData()
    const { password } = Object.fromEntries(formData);
    const requestBody = {
        email: forgotPasswordStore.email,
        password: password
    }
    const passwordValidationError = passwordValidator(requestBody.password as string)
    if( passwordValidationError === '' )
    {
        try {
            await axios.patch(`${BASE_URL}/login`, requestBody, {
                headers: getHeaders()
            });
            return redirect("/login");
        } catch (error) {
            console.error(error);
            return {message: "There is a server error"}
        }
    }
    else{
        return { message: passwordValidationError } // displays the validation error
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
        while ( !isSixFigure ) { // if case the random number is not six figure, we generate another number
            confirmedCode = Math.round( Math.random() * ( Math.pow( 10, CONFIRMATION_CODE_LENGTH )));// return a 6 figure random namber
            if ( confirmedCode.toString().length === CONFIRMATION_CODE_LENGTH ) {
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
    
                emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, mailParams, EMAIL_JS_PUBLIC_KEY)
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
    const res = await axios.post(`${BASE_URL}/login/isSuchUser`, {email: forgotPasswordStore.email}, {
        headers: getHeaders()})
    forgotPasswordStore.setIsSuchUser(res.data as boolean)
    return null
}