import { LoaderFunction } from "react-router-dom"
import rootStore from '../rootStore'
const { orderStore } = rootStore

export const ordersByUserIdLoader: LoaderFunction = async ({params}) => {
    const {userId} = params
    if(orderStore.userOrders){
        await orderStore.getOrders(userId as string)
    }
    return null //the change occurs in orderStore
}


