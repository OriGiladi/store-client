// import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useToast } from '@chakra-ui/toast';
import rootStore from '../rootStore';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { getHeadersWithJwt } from '../utils/sdk';
const { userStore, shoppingCartStore } = rootStore
function Checkout() {
    const [{ isPending }] = usePayPalScriptReducer()
    const toast = useToast();
    const today = new Date();
    
    const createOrder = async () => {
        const requestData = {
            user: userStore.user?._id,
            order: shoppingCartStore.getIdAndQauntity(),
            createdAt: today
        }
        try {
            await axios.post(`${BASE_URL}/order`, JSON.stringify(requestData), {
                headers: getHeadersWithJwt(userStore.userJwt as string)
            });
            toast({ 
                title: "Thanks for ordering from us!",
                duration: 5000,
                isClosable: true,
                status: "success",
                position: "top",
                colorScheme: 'pink'
            });
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }

    const onCreateOrder = async (data,actions) => {
       // await createOrder()
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "1.00",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    )
}

export default Checkout