import React from 'react';

const Cart = ({ cart, removeFromCart, addToCart }) => {
    return (
        <div className="cart-container h-fit md:w-1/4 lg:w-1/5 bg-base-200 rounded-box p-4 mt-4 md:mt-0">
            <h2 className="text-lg font-bold">Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{item.name} (x{item.quantity})</span>
                            <div className="flex mt-2 items-center">
                                <button className="btn btn-sm btn-secondary mr-1" onClick={() => removeFromCart(item.name)}>-</button>
                                <button className="btn btn-sm btn-primary" onClick={() => addToCart(item)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
            {cart.length > 0 && (
                <div className="mt-4">
                    <button className="btn btn-success w-full">Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
