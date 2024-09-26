// cartHelper.js
const CART_KEY = 'cartData';
const TOKEN_KEY = 'authorization'; // Adjust as per your actual token key

export const saveCart = (cart) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const cartData = { cart, token };
    localStorage.setItem(CART_KEY, JSON.stringify(cartData));
  }
};

export const getCart = () => {
  const cartData = JSON.parse(localStorage.getItem(CART_KEY));
  const token = localStorage.getItem(TOKEN_KEY);

  // Check if the current token matches the stored token
  if (cartData && cartData.token === token) {
    return cartData.cart;
  } else {
    // Clear cart if tokens do not match
    clearCart();
    return [];
  }
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Optionally, you can add more helper functions as needed
