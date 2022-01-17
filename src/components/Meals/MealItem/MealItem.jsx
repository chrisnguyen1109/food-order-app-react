import { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './MealItem.module.css';

MealItem.propTypes = {
    mealId: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    onAddItem: PropTypes.func,
};

MealItem.defaultProps = {
    name: '',
    price: 0,
    description: '',
    onAddItem: null,
};

function MealItem({ mealId, name, price, description, onAddItem }) {
    const amountRef = useRef();

    const submitHandler = e => {
        e.preventDefault();

        if (!onAddItem) return;

        onAddItem({
            id: mealId,
            name,
            amount: +amountRef.current.value,
            price,
        });
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.price}>${price.toFixed(2)}</div>
            </div>
            <div>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.input}>
                        <label htmlFor={`amount_${mealId}`}>Amount</label>
                        <input
                            ref={amountRef}
                            type="number"
                            min="1"
                            max="5"
                            step="1"
                            defaultValue="1"
                            id={`amount_${mealId}`}
                        />
                    </div>
                    <button type="submit">+ Add</button>
                </form>
            </div>
        </li>
    );
}

export default MealItem;
