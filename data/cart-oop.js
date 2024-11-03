function Cart (localStorageKey) {
    
    const cart = {
        cartItems : undefined,
        loadFromStroage : function(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            if (!this.cartItems){
            this.cartItems = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
            ];}
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
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
        },
        removeFromCart(productId) {
            const newCart = [];
        
            this.cartItems.forEach((item) => {
                if (item.productId !== productId){
                    newCart.push(item);
                }
            });
        
            this.cartItems = newCart;
            this.saveToStorage();
        },
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

    };
    return cart;

}

const cart = Cart('Cart-oop');

cart.loadFromStroage();
console.log(cart);
cart.addToCart('82bb68d7-ebc9-476a-989c-c78a40ee5cd9');

const bussinescart = Cart('cart-business');

bussinescart.loadFromStroage();
console.log(bussinescart);