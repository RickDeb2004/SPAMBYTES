import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import NavBar from "../components/NavBar";

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-black text-white">
            <h2>Name:{product.name}</h2>
            <p>Price:{product.price}</p>

            <ReactStars
                count={5}
                value={product.rating}
                edit={false}
                size={24}
                activeColour="#ffd700"
            />
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
    );
}

function CartItem({ item, onRemoveFromCart }) {
    
    return (
        <div>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
        </div>
    );
}

function Cart({ items, onRemoveFromCart }) {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    return (
        <div>
            <h2>Cart</h2>
            <p>Total price: {totalPrice.toFixed(2)}</p>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onRemoveFromCart={onRemoveFromCart}
                />
            ))}
        </div>
    );
}

function Home() {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        const newCartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            rating: product.rating,
        };
        setCartItems((prevItems) => [...prevItems, newCartItem]);
    }

    function removeFromCart(item) {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    }

    // assume that products is an array of product objects fetched from a database
    const products = [
        { id: 1, name: "I-Phone 14", price: 10.0, rating: 3 },
        { id: 2, name: "TupperWare Bottle", price: 20.0, rating: 4 },
        { id: 3, name: "Godrej Almirah", price: 30.0, rating: 5 },
    ];

    return (
        <div>
            <img
                className="relative top-[0px] left-[0px] w-full h-100% width=device-width"
                alt=""
                src="/960x0-1@2x.png "
            />
            <NavBar />

            <div className="flex absolute top-[400px] left-[400px] flex space-x-10 ">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
            <Cart items={cartItems} onRemoveFromCart={removeFromCart} />
        </div>
    );
}

export default Home;

