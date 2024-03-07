import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from "react-router-dom";
import rootStore from '../rootStore';
import { BASE_URL, currency } from '../utils/constants';
import axios from 'axios';
import { getHeadersWithJwt } from '../utils/sdk';
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
const { userStore, shoppingCartStore } = rootStore
function Checkout() {
    const [{ isPending }] = usePayPalScriptReducer()
    const toast = useToast();
    const navigate = useNavigate()
    const today = new Date();
    
    const createOrder = async (payerName: string) => {
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
                title: `Thanks for ordering from us, ${payerName}!`,
                duration: 5000,
                isClosable: true,
                status: "success",
                position: "top",
                colorScheme: 'pink'
            });
            navigate(`../order-history/${userStore.user?._id}`)
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
    }

    const onCreateOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        value: `${shoppingCartStore.totalPrice}.00`,
                        currency_code: currency
                        
                    },
                },
            ],
        });
    }

    const onApproveOrder = async (data: OnApproveData, actions: OnApproveActions) => {
        return actions.order?.capture().then(async (details) => {
            const payerName = details?.payer?.name?.given_name as string;
            await createOrder(payerName);
        });
    };

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