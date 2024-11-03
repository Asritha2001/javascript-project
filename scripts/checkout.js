import {cart, removeFromCart, updateDeliveryOption, loadCart} from '../data/cart.js';
import { products, loadProducts, loadProductsFetch} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'; 
import '../data/cart-class.js';
import { orders, addOrders } from '../data/orders.js';
//import '../data/backend_practice.js';

export function renderOrderSummary() {

    let cartSummaryHtml = '';

    cart.forEach((item) => {
        const productId = item.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId){
                matchingProduct = product;
            }
        });
        console.log(matchingProduct);
        const deliveryOptionId = item.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = (deliveryDate.format('dddd, MMMM D'));
        

        cartSummaryHtml += `<div class="cart-item-container
        js-cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, item)}
                </div>
            </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, item){
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = (deliveryDate.format('dddd, MMMM D'));
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`

            const isChecked = deliveryOption.id === item.deliveryOptionId;

            html += `<div class="delivery-option js-delivery-option" 
            data-product-id = ${matchingProduct.id} data-delivery-option-id = ${deliveryOption.id}>
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
                </div>
            </div>
        
        `
        });
        return html;
    };

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
            const order = await response.json();
            addOrders(order);
        }
        catch (error) {
            console.log("Try again later")
        }
        window.location.href = ('orders.html');
    });

}



// loadProductsFetch().then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });
// }).then(() => {
//     renderOrderSummary();
// });

async function loadPage(){
    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    renderOrderSummary(); 
}
loadPage();

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//     });
// });

