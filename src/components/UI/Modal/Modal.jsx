import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onHideCart: PropTypes.func,
};

Modal.defaultProps = {
    onHideCart: null,
};

function Modal({ children, onHideCart }) {
    return (
        <>
            {ReactDOM.createPortal(
                <>
                    <div onClick={onHideCart} className={styles.backdrop}></div>
                    <div className={`${styles.modal}`}>
                        <div className={styles.content}>{children}</div>
                    </div>
                </>,
                document.getElementById('modal-overlays')
            )}
        </>
    );
}

export default Modal;
