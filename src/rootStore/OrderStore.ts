import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import { BASE_URL } from "../utils/constants";
import { Product } from "./ProductStore";

type fetchedOrder = {
    _id: string,
    order: orderDitail []
}
type orderDitail = {
    product: string,
    quantity: number,
    createdAt: Date
}
export type order = {
    product: Product,
    quantity: number,
    createdAt: Date
}
class OrderStore {
    rootStore: RootStore;
    userOrders: order [] = []
    email: string | undefined;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    getOrdersByUserId = async (userId: string) => {
        const res = await fetch(`${BASE_URL}/order/${userId}`)
        const data = await res.json()
        return data.data as fetchedOrder []
    }
    
    getProductByProductId = async (productId: string) => {
        const res = await fetch(`${BASE_URL}/product/${productId}`)
        const data = await res.json()
        return data.data as Product;
    }
    getOrders = async (userId: string) => {
        const orders = await this.getOrdersByUserId(userId)
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].order.length; j++) {
                const product = await this.getProductByProductId(orders[i].order[j].product)
                this.userOrders.push({product: product, quantity: orders[i].order[j].quantity, createdAt: orders[i].order[j].createdAt})
            }
        }
    }
}
export default OrderStore
