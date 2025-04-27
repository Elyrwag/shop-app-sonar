import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext); // custom hook useShop

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { product, quantity: 1 }];
            }
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prev => {
            return prev
                .map(item => item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart
    }), [cart, addToCart, removeFromCart, clearCart]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );

};

ShopProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
