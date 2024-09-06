import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart,clearCart, decreaseCart, getTotals } from "../app/cartSlice";

import { Link } from "react-router-dom";

const CheckoutCart = () => {

    const cart = useSelector((state) => state.cart);
    const dispatch =useDispatch()
  
    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch]);
  
    function handleRemoveFromCart(cartItem){
        dispatch(removeFromCart(cartItem));
        console.log(cartItem)
    }
  
    function handleAddToCart(product){
      dispatch(addToCart(product))
    }
    
    function handleDecreaseCart(product){
      dispatch(decreaseCart(product));
    }
    function handleClearCart(){
      dispatch(clearCart());
    }
    var Size = Object.keys(cart.cartItems);

  return (
    <div>
       <div className="cart-container">
      <h2>Checkout Your Products</h2>
      {Size.length == 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              Object.keys(cart.cartItems).map((key) => {
                const cartItem = cart.cartItems[key];
                return (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                    <img src={cartItem.images[0]} alt={cartItem.title} />

                      <div>
                        <h3 className="font-bold">{cartItem.title}</h3>
                      
                     
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                      <div className="count">{cartItem.quantity}</div>     
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.quantity}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-summary">
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${(cart.cartTotalAmount+80).toFixed(2)}</span>
              </div>
              <p>Taxes and shipping Added</p>
              <Link to = "/checkout"><button>Pay Now </button></Link>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default CheckoutCart
