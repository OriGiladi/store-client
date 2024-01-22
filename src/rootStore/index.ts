import UserStore from "./UserStore";
import ProductStore from "./ProductStore";
import ShoppingCartStore from "./ShoppingCartStore";
export class RootStore {
    userStore: UserStore;
    productStore: ProductStore;
    shoppingCartStore: ShoppingCartStore;
    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
    }
    reset() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
    }
}
const rootStore = new RootStore();
export default rootStore;