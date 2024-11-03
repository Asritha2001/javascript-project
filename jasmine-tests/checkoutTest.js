import { renderOrderSummary } from "../scripts/checkout.js";
import { loadFromStroage } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

describe('Test Suite : renderOrderSummary', () => {
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class= "js-order-summary"></div>
            <div class="js-place-order"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStroage();
        renderOrderSummary();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        document.querySelector('.js-test-container').innerHTML = ``;
    });
});