class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.loadFromStroage();
    }

    loadFromStroage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItems){
        this.cartItems = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }
        ];}
    };
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };
    addToCart(productId, productQuantity) {
        let matchingItem;
        this.cartItems.forEach((item) => {
        if(productId === item.productId) {
            matchingItem = item;
        }
        });
        if (matchingItem) {
        matchingItem.quantity += productQuantity? productQuantity : 1;
        }
        else {
        this.cartItems.push({
            productId: productId,
            quantity: productQuantity? productQuantity : 1,
            deliveryOptionId: '1'
        });
        }
        this.saveToStorage();
    };
    removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((item) => {
            if (item.productId !== productId){
                newCart.push(item);
            }
        });
    
        this.cartItems = newCart;
        this.saveToStorage();
    };
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((item) => {
            if(productId === item.productId) {
            matchingItem = item;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}



const cart = new Cart('cart-oop');
console.log(cart);

const bussinescart = new Cart('cart-business');

console.log(bussinescart);
console.log(bussinescart instanceof Cart);