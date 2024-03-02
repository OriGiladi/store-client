import UserStore from "./UserStore";
import ProductStore from "./ProductStore";
import ShoppingCartStore from "./ShoppingCartStore";
import ForgotPasswordStore from "./ForgotPasswordStore";
import OrderStore from "./OrderStore";
export class RootStore {
    userStore: UserStore;
    productStore: ProductStore;
    shoppingCartStore: ShoppingCartStore;
    forgotPasswordStore: ForgotPasswordStore
    orderStore: OrderStore;
    constructor() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
        this.forgotPasswordStore = new ForgotPasswordStore(this)
        this.orderStore = new OrderStore(this)
    }
    reset() {
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.shoppingCartStore = new ShoppingCartStore(this);
        this.forgotPasswordStore = new ForgotPasswordStore(this)
        this.orderStore = new OrderStore(this)
    }
}
const rootStore = new RootStore();
export default rootStore;