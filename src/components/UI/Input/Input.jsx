import { useState, useEffect } from 'react';

import styles from './Input.module.css';

function Input({ label, name, validMessage, checkValid, checkFormValid, ...args }) {
    const [value, setValue] = useState('');
    const [touch, setTouch] = useState(false);

    const inputValid = checkValid(value);
    const hasError = touch && !inputValid;

    useEffect(() => {
        checkFormValid(name, inputValid);
    }, [inputValid]);

    const changeInputHandler = e => {
        setValue(e.target.value);
        setTouch(true);
    };

    const blurInputHandler = () => setTouch(true);

    return (
        <div className={`${styles.control} ${hasError ? styles.invalid : ''}`}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                autoComplete="new-password"
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                {...args}
            />
            {hasError && <p>{validMessage}</p>}
        </div>
    );
}

export default Input;
