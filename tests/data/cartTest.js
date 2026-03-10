import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    // Mock DOM
    document.querySelector(".js-test-container").innerHTML = `
      <select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
        <option value="1" selected>1</option>
      </select>
      <select class="js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d">
        <option value="1" selected>1</option>
      </select>
    `;

    // Mock localStorage
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("adds an existing product to the cart", () => {
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[1].quantity).toEqual(1);
  });
});
