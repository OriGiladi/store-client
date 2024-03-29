import { Suspense, useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_SERVICE_ID, EMAIL_JS_PUBLIC_KEY, EMAIL_JS_TEMPLATE_ID, CONFIRMATION_CODE_LENGTH } from '../../utils/constants';
import {authActionError } from '../../utils/types';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useActionData } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import rootStore from '../../rootStore';
const {forgotPasswordStore} = rootStore

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
                {errorInAction ? <Box mt={20} color="pink.500">{errorInAction.message}</Box> : null}
            </Suspense>
        ) : (<Text color="pink.500"> There is no user with this email</Text>)}
        </>
    );
};
export default ForgotPassword;

