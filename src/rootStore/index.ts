import UserStore from "./UserStore";
import ProductStore from "./ProductStore";
export class RootStore {
    userStore: UserStore;
    productStore: ProductStore;
    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
    }
    reset() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
    }
}
const rootStore = new RootStore();
export default rootStore;