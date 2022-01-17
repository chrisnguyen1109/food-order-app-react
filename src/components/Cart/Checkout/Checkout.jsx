import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Checkout.module.css';
import Input from '../../UI/Input/Input';

Checkout.propTypes = {
    onCloseCheckOut: PropTypes.func,
    onOrder: PropTypes.func,
};

Checkout.defaultProps = {
    onCloseCheckOut: null,
    onOrder: null,
};

function Checkout({ onCloseCheckOut, onOrder }) {
    const [formValid, setFormValid] = useState(false);
    const initForm = useRef({
        name: {
            label: 'Your Name',
            name: 'name',
            validMessage: 'Please enter a valid name!',
            checkValid(value) {
                return value.trim() !== '';
            },
            valid: false,
        },
        street: {
            label: 'Street',
            name: 'street',
            validMessage: 'Please enter a valid street!',
            checkValid(value) {
                return value.trim() !== '';
            },
            valid: false,
        },
        city: {
            label: 'City',
            name: 'city',
            validMessage: 'Please enter a valid city!',
            checkValid(value) {
                return value.trim() !== '';
            },
            valid: false,
        },
        postalCode: {
            label: 'Postal Code',
            name: 'postalCode',
            validMessage: 'Please enter a valid postal code (5 characters long)!',
            checkValid(value) {
                return +value > 0 && value.trim().length === 5;
            },
            valid: false,
        },
    });
    const formRef = useRef();

    const checkFormValidHandler = (name, validStatus) => {
        initForm.current[name].valid = validStatus;

        for (const [, value] of Object.entries(initForm.current)) {
            if (value.valid === false) {
                setFormValid(false);
                return;
            }
        }

        setFormValid(true);
    };

    const submitHandler = e => {
        e.preventDefault();

        if (!formValid) return;

        onOrder({
            name: formRef.current['name'].value,
            street: formRef.current['street'].value,
            city: formRef.current['city'].value,
            postalCode: formRef.current['postalCode'].value,
        });
    };

    const formInputs = [];

    for (const [key, value] of Object.entries(initForm.current)) {
        formInputs.push(
            <Input
                key={key}
                label={value.label}
                name={value.name}
                type={value.type || 'text'}
                validMessage={value.validMessage}
                checkValid={value.checkValid}
                checkFormValid={checkFormValidHandler}
            />
        );
    }

    return (
        <>
            <form onSubmit={submitHandler} className={styles.form} ref={formRef}>
                <div className={styles.control}>{formInputs}</div>
            </form>
            <div className={styles.actions}>
                <button onClick={onCloseCheckOut} type="button">
                    Cancel
                </button>
                <button disabled={!formValid} className={styles.submit} onClick={submitHandler}>
                    Confirm
                </button>
            </div>
        </>
    );
}

export default Checkout;
