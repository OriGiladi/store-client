import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import { BASE_URL } from "../utils/constants";

export interface Product{ 
    _id: string,
    name: string,
    price: string,
    description: string,
    image: string
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
    async loadAllProducts() {
        const res = await fetch(`${BASE_URL}/product`)
        const loaded: LoadedData = await res.json() as LoadedData 
        return loaded.data;
    }
}
export default ProductStore

