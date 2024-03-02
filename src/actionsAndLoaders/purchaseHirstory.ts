import { LoaderFunction } from "react-router-dom"
import rootStore from '../rootStore'
const { userStore, orderStore } = rootStore

export const ordersByUserIdLoader: LoaderFunction = async () => {
    if(orderStore.userOrders){
        await orderStore.getOrders(userStore.user?._id as string)
    }
    return null //the change occurs in orderStore
}


