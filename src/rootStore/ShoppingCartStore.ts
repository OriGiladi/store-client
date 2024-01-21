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
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.shoppingCartItems = []
        this.shoppingCartItemsWithAmounts = []
        makeAutoObservable(this);
    }
    setShoppingCartItems(shoppingCartItems: ShoppingCartItem []) {
        this.shoppingCartItems = shoppingCartItems;
    }
    addProductToCart(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartItems.push(shoppingCartItem);
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
    sumTotalPrice(){
        let sum = 0;
        this.shoppingCartItems.forEach(item => {
            sum += Number(item.price);
        })
        return sum
    }
}
export default ShoppingCartStore

