import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/Cart/CartProvider';

function App() {
    return (
        <CartProvider>
            <>
                <Header />
                <main>
                    <Meals />
                </main>
            </>
        </CartProvider>
    );
}

export default App;
