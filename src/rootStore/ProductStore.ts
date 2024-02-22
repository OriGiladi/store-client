import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import { BASE_URL } from "../utils/constants";
import axios from 'axios'
import { getHeaders } from "../utils/sdk";
export interface Product{ 
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string,
    ratings: ratings []
}
export type ratings = { 
    user: string,
    rating: number
}
interface LoadedData {
    data: Product []
}
class ProductStore {
    rootStore: RootStore;
    allProducts?: Product [];
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    setAllProducts(allProducts: Product []) {
        this.allProducts = allProducts;
    }
    isRatedByTheUser(product: Product, userId: string) {
        const isUserExist = product.ratings.find((item) => {
            return item.user === userId;
        });
        return isUserExist ? true : false;
    }
    getTotalRateOfProduct(product: Product) {
        let totalRate = 0;
        if(product.ratings.length === 0){
            return 0;
        }
        product.ratings.forEach((item) => {
            totalRate += item.rating;
        })
        return Math.round(totalRate / product.ratings.length);
    }
    async addRating(product: Product, inputRating: number, userId: string) {
        product.ratings.push({
            user: userId,
            rating: inputRating
        })
        const requestBody = {
            ratings: product.ratings,
        }
        try {
            await axios.patch(`${BASE_URL}/product/${product._id}`, requestBody, {
                headers: getHeaders()
            });
            return {message: "Succeeded"}
        } catch (error) {
            console.error(error);
            return {message: "There is a server error"}
        }
        
    }
    async loadAllProducts() {
        const res = await fetch(`${BASE_URL}/product`)
        const loaded: LoadedData = await res.json() as LoadedData 
        return loaded.data;
    }
}
export default ProductStore

