import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import reducer, { initCart } from './reducer';
import Context from './Context';

CartProvider.propTypes = {
    children: PropTypes.element.isRequired,
};

function CartProvider({ children }) {
    const [cart, dispatchCart] = useReducer(reducer, initCart, initial => {
        return JSON.parse(localStorage.getItem('cart')) || initial;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return <Context.Provider value={{ cart, dispatchCart }}>{children}</Context.Provider>;
}

export default CartProvider;
