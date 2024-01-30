import UserStore from "./UserStore";
import ProductStore from "./ProductStore";
import ShoppingCartStore from "./ShoppingCartStore";
import ForgotPasswordStore from "./ForgotPasswordStore";
export class RootStore {
    userStore: UserStore;
    productStore: ProductStore;
    shoppingCartStore: ShoppingCartStore;
    forgotPasswordStore: ForgotPasswordStore
    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
        this.forgotPasswordStore = new ForgotPasswordStore(this)
    }
    reset() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
        this.forgotPasswordStore = new ForgotPasswordStore(this)
    }
}
const rootStore = new RootStore();
export default rootStore;