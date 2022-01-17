import styles from './Header.module.css';
import mealsImg from '../../../assets/img/meals.jpg';
import HeaderCartButton from './HeaderCartButton/HeaderCartButton';

function Header() {
    return (
        <>
            <header className={styles.header}>
                <h1 onClick={() => window.location.reload()}>ReactMeals</h1>
                <HeaderCartButton />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImg} alt="A table of delicious food" />
            </div>
        </>
    );
}

export default Header;
