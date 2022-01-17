import { useEffect, useState } from 'react';

import { useCart, useFetch } from '../../store/Cart/hooks';
import { addItem } from '../../store/Cart/actions';

import MealSummary from './MealSummary/MealsSummary';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';
import styles from './Meals.module.css';

function Meals() {
    const { loading, errorMsg, fetchMeals } = useFetch();
    const [meals, setMeals] = useState([]);
    const { dispatchCart } = useCart();

    const addToCartHandler = item => {
        dispatchCart(addItem(item));
    };

    useEffect(() => {
        fetchMeals(
            {
                url: 'https://food-order-app-7e8c0-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
            },
            data => {
                for (const [key, value] of Object.entries(data)) {
                    setMeals(prevState => {
                        return prevState.concat({
                            id: key,
                            name: value.name,
                            description: value.description,
                            price: value.price,
                        });
                    });
                }
            }
        );
    }, [fetchMeals]);

    if (loading) {
        return (
            <section className={styles.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (errorMsg) {
        return (
            <section className={styles.MealsError}>
                <p>{errorMsg}</p>
            </section>
        );
    }

    return (
        <>
            <MealSummary />
            <section className={styles.meals}>
                <Card>
                    <ul>
                        {meals.map(meal => (
                            <MealItem
                                key={meal.id}
                                mealId={meal.id}
                                name={meal.name}
                                price={meal.price}
                                description={meal.description}
                                onAddItem={addToCartHandler}
                            />
                        ))}
                    </ul>
                </Card>
            </section>
        </>
    );
}

export default Meals;
