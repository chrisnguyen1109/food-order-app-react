import PropTypes from 'prop-types';

import styles from './CartItem.module.css';

CartItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    onIncreaseItem: PropTypes.func,
    onDecreaseItem: PropTypes.func,
};

CartItem.defaultProps = {
    name: '',
    price: 0,
    amount: 0,
    onIncreaseItem: null,
    onDecreaseItem: null,
};

function CartItem({ name, price, amount, onIncreaseItem, onDecreaseItem }) {
    return (
        <li className={styles['cart-item']}>
            <div>
                <h2>{name}</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <span className={styles.amount}>x {amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={onDecreaseItem}>−</button>
                <button onClick={onIncreaseItem}>+</button>
            </div>
        </li>
    );
}

export default CartItem;
