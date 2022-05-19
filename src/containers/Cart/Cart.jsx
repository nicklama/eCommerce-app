import style from "./Cart.module.scss";
import { useEffect, useState } from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import { getFirestoreData } from "../../services/server";

const Cart = () => {
    const [cartProducts, setCart] = useState([]);

    const getData = async () => {
        const myData = await getFirestoreData("cart");
        setCart(myData);
    };

    useEffect(() => {
        getData();
    }, []);

    const cartDel = (id) => {
        // filter removes a specific ID
        // console.log(cartProducts);
        // cart.splice(id, 1);
        setCart(cartProducts.filter((prod) => prod.id !== id));
        // console.log(cartProducts);
    };

    console.log(cartProducts);

    const total = cartProducts.reduce(
        (acc, prod) => acc + prod.price * Object.values(prod.cart).reduce((sum, n) => sum + n),
        0,
    );

    const handleUpdate = () => {
        // updates the total price when a quantity is changed
        setCart([...cartProducts]);
    };

    return (
        <main className={style.Cart}>
            <h1>Cart</h1>
            <div className={style.Cart__List}>
                {cartProducts.map((product) => (
                    <CartProduct
                        key={product.id}
                        product={product}
                        cartDel={cartDel}
                        handleUpdate={handleUpdate}
                    />
                ))}
            </div>
            <h2>Total: ${total.toFixed(2)}</h2>
        </main>
    );
};

export default Cart;
