import { cart } from "../../data/cart-class.js";

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
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("adds an existing product to the cart", () => {
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]),
    );
  });

  it("adds a new product to the cart", () => {
    cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[1].productId).toEqual(
      "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    );
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]),
    );
  });
});

describe("test suites: removeFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, "setItem");
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
  });

  it("remove a product from the cart", () => {
    cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([]),
    );
  });

  it("does nothing if product is not in the cart", () => {
    cart.removeFromCart("does-not-exist");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]),
    );
  });
});

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
  });

  it("updates the delivery option", () => {
    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ]),
    );
  });

  it("does nothing if the product is not int he cart", () => {
    cart.updateDeliveryOption("does-not-exist", "3");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the delivery option does not exist", () => {
    cart.updateDeliveryOption(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "does-not-exist",
    );
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
