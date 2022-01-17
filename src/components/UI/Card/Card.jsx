import PropTypes from 'prop-types';

import styles from './Card.module.css';

Card.propTypes = {
    children: PropTypes.element.isRequired,
};

function Card({ children }) {
    return <div className={styles.card}>{children}</div>;
}

export default Card;
