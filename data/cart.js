export let cart;

loadFromStroage();

export function loadFromStroage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
  cart = [
  // {
  //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  //     quantity: 1,
  //     deliveryOptionId: '1'
  // }
  ];}
};

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += productQuantity? productQuantity : 1;
    }
    else {
      cart.push({
        productId: productId,
        quantity: productQuantity? productQuantity : 1,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
  };

  export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((item) => {
        if (item.productId !== productId){
            newCart.push(item);
        }
    });

    cart = newCart;
    saveToStorage();
  };

  export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }

  export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log("load cart");
      fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }
  