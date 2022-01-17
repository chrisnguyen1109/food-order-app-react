import { useState } from 'react';

import { useCart, useFirstMount } from '../../../../store/Cart/hooks';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../../../../assets/js/CartIcon';
import Cart from '../../../Cart/Cart';

function HeaderCartButton() {
    const [displayCart, setDisplayCart] = useState(false);
    const [cartChange, setCartChange] = useState(false);
    const { cart } = useCart();

    useFirstMount(() => {
        setCartChange(true);

        const timer = setTimeout(() => {
            setCartChange(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, cart);

    const btnClasses = `${styles.button} ${cartChange && styles.bump}`;

    const showCartHandler = () => setDisplayCart(true);

    const hideCartHandler = () => setDisplayCart(false);

    return (
        <>
            {displayCart && <Cart onHideCart={hideCartHandler} />}
            <button onClick={showCartHandler} className={btnClasses}>
                <span className={styles.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={styles.badge}>{cart.total}</span>
            </button>
        </>
    );
}

export default HeaderCartButton;
