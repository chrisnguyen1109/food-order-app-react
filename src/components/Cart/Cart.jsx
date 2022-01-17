import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';
import { useCart, useFetch } from '../../store/Cart/hooks';
import { addItem, removeItem, clearItem } from '../../store/Cart/actions';

Cart.propTypes = {
    onHideCart: PropTypes.func,
};

Cart.defaultProps = {
    onHideCart: null,
};

function Cart({ onHideCart }) {
    const { cart, dispatchCart } = useCart();
    const [displayCheckout, setDisplayCheckout] = useState(false);
    const { loading, errorMsg, fetchMeals } = useFetch();
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemList = [];

    for (const [, value] of Object.entries(cart.items)) {
        cartItemList.push({ ...value });
    }

    const inreaseItemHandler = item => dispatchCart(addItem({ ...item, amount: 1 }));

    const decreaseItemHandler = item => dispatchCart(removeItem(item.id));

    const orderMeals = user => {
        fetchMeals(
            {
                url: 'https://food-order-app-7e8c0-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
                method: 'POST',
                body: JSON.stringify({
                    user,
                    items: cart.items,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            () => {
                setDidSubmit(true);
                dispatchCart(clearItem());
            }
        );
    };

    useEffect(() => {
        cart.total === 0 && setDisplayCheckout(false);
    }, [cart]);

    if (loading) {
        return (
            <Modal onHideCart={onHideCart}>
                <p className={styles.msg}>Sending order data...</p>
            </Modal>
        );
    }

    if (errorMsg) {
        return (
            <Modal onHideCart={onHideCart}>
                <p className={`${styles.msg} ${styles.err}`}>{errorMsg}</p>
            </Modal>
        );
    }

    if (didSubmit) {
        return (
            <Modal onHideCart={onHideCart}>
                <>
                    <p className={styles.msg}>Successfully sent the order!</p>
                    <div className={styles.actions}>
                        <button className={styles.button} onClick={onHideCart}>
                            Close
                        </button>
                    </div>
                </>
            </Modal>
        );
    }

    return (
        <Modal onHideCart={onHideCart}>
            <>
                <ul className={styles['cart-items']}>
                    {cartItemList.map(item => (
                        <CartItem
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                            onIncreaseItem={() => inreaseItemHandler(item)}
                            onDecreaseItem={() => decreaseItemHandler(item)}
                        />
                    ))}
                </ul>
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
                {displayCheckout && (
                    <Checkout
                        onCloseCheckOut={() => setDisplayCheckout(false)}
                        onOrder={orderMeals}
                    />
                )}
                {!displayCheckout && (
                    <div className={styles.actions}>
                        <button onClick={onHideCart} className={styles['button--alt']}>
                            Close
                        </button>
                        {cartItemList.length > 0 && (
                            <button
                                onClick={() => setDisplayCheckout(true)}
                                className={styles.button}
                            >
                                Order
                            </button>
                        )}
                    </div>
                )}
            </>
        </Modal>
    );
}

export default Cart;
