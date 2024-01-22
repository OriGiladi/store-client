import { RootStore } from ".";
import { makeAutoObservable } from "mobx";

export interface ShoppingCartItem {
    name: string;
    price: string;
    image: string;
}

type ShoppingCartItems =  {item: ShoppingCartItem; quantity: number} []
class ShoppingCartStore {
    rootStore: RootStore;
    shoppingCartItems: ShoppingCartItems;
    totalPrice: number;
    totalAmount: number;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.shoppingCartItems = [];
        this.totalPrice = 0;
        this.totalAmount = 0;
        makeAutoObservable(this);
    }

    addToTotalPriceAndAmount(price: number) {
        this.totalPrice += price;
        this.totalAmount += 1;
    }

    decreaseFromTotalPriceAndAmount(price: number) {
        this.totalPrice -= price;
        this.totalAmount -= 1;
    }

    addProductToCart(shoppingCartItem: ShoppingCartItem) {
    const existingItem = this.shoppingCartItems.find(
        (item) => item.item.name === shoppingCartItem.name
    );

    if (existingItem) {
            existingItem.quantity += 1;
    } else {
        this.shoppingCartItems.push({
        item: shoppingCartItem,
        quantity: 1,
        });
    }

    this.addToTotalPriceAndAmount(Number(shoppingCartItem.price));
    }

    removeProductFromCart(shoppingCartItem: ShoppingCartItem) {
        const existingItemIndex = this.shoppingCartItems.findIndex(
        (item) => item.item.name === shoppingCartItem.name
    );

    if (existingItemIndex !== -1) {
        const existingItem = this.shoppingCartItems[existingItemIndex];
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            this.shoppingCartItems.splice(existingItemIndex, 1);
        }

        this.decreaseFromTotalPriceAndAmount(Number(shoppingCartItem.price));
        }
    }
}

export default ShoppingCartStore;
