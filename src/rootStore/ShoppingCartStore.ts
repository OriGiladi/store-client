import { RootStore } from ".";
import { makeAutoObservable } from "mobx";

export interface ShoppingCartItem {
    name: string;
    price: string;
    image: string;
    description: string;
}
export type ShoppingCartWithQuantity =  {item: ShoppingCartItem; quantity: number} 
class ShoppingCartStore {
    rootStore: RootStore;
    shoppingCartItems: ShoppingCartWithQuantity [];
    totalPrice: number;
    totalAmount: number;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.shoppingCartItems = [];
        this.totalPrice = 0;
        this.totalAmount = 0;
        makeAutoObservable(this);
    }
    updateTotalPriceAndAmount(price: number, amount: number) {
        this.totalPrice += price;
        this.totalAmount += amount;
    }
    setTotalPriceAndAmountFor(price: number) {
        this.totalPrice = price;
        this.totalAmount = 1;
    }

    ChangeQuantity(shoppingCartItem: ShoppingCartItem, quantity: number) {
        const existingItem = this.shoppingCartItems.find(
            (item) => item.item.name === shoppingCartItem.name
        ); 
        if (existingItem) {
            this.updateTotalPriceAndAmount((Number(shoppingCartItem.price) * 
            (quantity - existingItem.quantity)),  quantity - existingItem.quantity);
                existingItem.quantity = quantity;
            if(quantity === 0) {
                this.removeProductFromCart(shoppingCartItem);
            }
        } 
    }
    quickShop(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartItems = []
        this.shoppingCartItems.push({
            item: shoppingCartItem,
            quantity: 1,
        });
        this.setTotalPriceAndAmountFor(Number(shoppingCartItem.price));
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

        this.updateTotalPriceAndAmount(Number(shoppingCartItem.price), 1);
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
            }
        }
    }

export default ShoppingCartStore;
