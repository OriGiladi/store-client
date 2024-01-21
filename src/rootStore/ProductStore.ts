import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import { baseUrl } from "../utils/constants";

interface Product{ // TODO: move it to a better place
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
        const res = await fetch(`${baseUrl}/product`)
        const loaded: LoadedData = await res.json() as LoadedData 
        return loaded.data;
    }
}
export default ProductStore

