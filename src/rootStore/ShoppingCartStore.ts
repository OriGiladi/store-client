import { RootStore } from ".";
import { makeAutoObservable } from "mobx";

export interface ShoppingCartItem{ // TODO: move it to a better place
    name: string,
    price: string,
    image: string
}
export interface shoppingCartItemsWithAmounts{
    name: string,
    price: string,
    image: string,
    amount: number,
} 
class ShoppingCartStore {
    rootStore: RootStore;
    shoppingCartItems: ShoppingCartItem [];
    shoppingCartItemsWithAmounts: shoppingCartItemsWithAmounts [];
    totalPrice: number;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.shoppingCartItems = []
        this.shoppingCartItemsWithAmounts = []
        this.totalPrice = 0
        makeAutoObservable(this);
    }
    setShoppingCartItems(shoppingCartItems: ShoppingCartItem []) {
        this.shoppingCartItems = shoppingCartItems;
    }
    setTotalPrice(totalPrice: number) {
        this.totalPrice = totalPrice;
    }
    addToTotalPrice(price: number) {
        this.totalPrice += price;
    }
    deacreseFromTotalPrice(price: number) {
        this.totalPrice -= price;
    }
    addProductToCart(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartItems.push(shoppingCartItem);
        this.addToTotalPrice(Number(shoppingCartItem.price)) // updating the total sum
        this.setShoppingCartItemsWithAmounts(); // updating the list with the amount
    }
    removeProductFromCart(shoppingCartItem: ShoppingCartItem) {
        const indexToRemove = this.shoppingCartItems.findIndex(element => element.name === shoppingCartItem.name);
        if (indexToRemove !== -1) {
            this.shoppingCartItems.splice(indexToRemove, 1);
        }
        this.deacreseFromTotalPrice(Number(shoppingCartItem.price)) // updating the total sum
        this.setShoppingCartItemsWithAmounts(); // updating the list with the amount
    }
    setShoppingCartItemsWithAmounts(){ // adding the amout picked to each item
        this.shoppingCartItemsWithAmounts = [] // resets the list before the calculation
        const shoppingCartNames: string[] = []
        this.shoppingCartItems.forEach(shoppingCartItem => {
            if(!shoppingCartNames.includes(shoppingCartItem.name)){
                shoppingCartNames.push(shoppingCartItem.name)
                this.shoppingCartItemsWithAmounts.push({
                    name: shoppingCartItem.name,
                    price: shoppingCartItem.price,
                    image: shoppingCartItem.image,
                    amount: 1
                })
            }
            else{
                this.shoppingCartItemsWithAmounts.forEach(item => {
                    if(item.name === shoppingCartItem.name){
                        item.amount += 1;
                    }
                })
            }
        })
    }
}
export default ShoppingCartStore

