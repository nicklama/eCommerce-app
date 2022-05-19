import { faCircleMinus, faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { delProduct, updateProduct } from "../../services/server";
import style from "./CartProduct.module.scss";

const CartProduct = ({ product, cartDel, handleUpdate }) => {
    const [cartProduct, setCartProduct] = useState(product);

    const handleDelete = () => {
        delProduct(cartProduct.id.toString(), "cart");
        cartDel(cartProduct.id);
    };

    const handleMinus = (size) => {
        // deletes the size if the quantity is less than 0
        if (cartProduct.cart[size] === 1) {
            const { [size]: zeroSize, ...cart } = cartProduct.cart; // removes the size that is being reduced to 0
            if (Object.values(cart).length === 0) {
                // removes the product from the cart entirely if there are no other sizes selected
                handleDelete();
            } else {
                setCartProduct({ ...cartProduct, cart });
                updateProduct(cartProduct.id.toString(), { ...cartProduct, cart }, "cart");
            }
            return;
        }
        cartProduct.cart[size]--;
        setCartProduct({ ...cartProduct });
        updateProduct(cartProduct.id.toString(), cartProduct, "cart");
        handleUpdate();
    };

    const handlePlus = (size) => {
        const cartQty = Object.values(product.cart).reduce((sum, n) => sum + n);
        if (cartQty >= product.stock)
            return alert(
                "Unfortunately, we do not have enough stock to fulfill your request, please try again later.",
            );
        cartProduct.cart[size]++;
        setCartProduct({ ...cartProduct });
        updateProduct(cartProduct.id.toString(), cartProduct, "cart");
        handleUpdate();
    };

    return (
        <div className={style.CartProduct}>
            <img className={style.CartProduct__Image} src={cartProduct.image} alt="Product" />
            <span>
                <h4>{cartProduct.title}</h4>
                <p>
                    Rating: {cartProduct.rating.rate} stars - {cartProduct.rating.count} reviews
                </p>
            </span>
            <span>
                <p>Quantity:</p>
                {Object.entries(cartProduct?.cart).map((sizeQty) => (
                    <div key={sizeQty[0]} className={style.CartProduct__Quantity}>
                        <FontAwesomeIcon
                            icon={faCircleMinus}
                            className={style.CartProduct__Icon}
                            onClick={() => handleMinus(sizeQty[0])}
                        />
                        <p>
                            {sizeQty[0]}: {sizeQty[1]}
                        </p>
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            className={style.CartProduct__Icon}
                            onClick={() => handlePlus(sizeQty[0])}
                        />
                    </div>
                ))}
            </span>
            <span className={style.CartProduct__PriceDel}>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    size="xl"
                    onClick={handleDelete}
                    className={style.CartProduct__Icon}
                />
                <p>AU${cartProduct.price} ea.</p>
            </span>
        </div>
    );
};

export default CartProduct;
