import style from "./ProductPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createProduct, getProduct, updateProduct } from "../../services/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductPage = ({ products, setProducts }) => {
    const { prodID } = useParams();
    const [product, setProduct] = useState({});
    let selectedSize;

    useEffect(() => {
        // casting ID as string to check the strict equality (ID stored as a number in the object)
        setProduct(products.find((prod) => String(prod.id) === prodID));
    }, [products, prodID]);

    const handleFav = () => {
        product.isFav = !product.isFav; // toggles the favourited property
        setProducts([...products]); // updates product list when fav is toggled
        updateProduct(product?.id.toString(), product, "products"); // updating the DB
    };

    // adds red styling to the favourite icon when it is favourited
    const favIconStyle = product.isFav
        ? `${style.ProductPage__Icon} ${style.ProductPage__Icon_red}`
        : style.ProductPage__Icon;

    const handleSelect = (e) => {
        // tracks the product size for adding to the cart
        selectedSize = e.target.value;
    };

    const handleCartAdd = async () => {
        // returns an alert if no size has been selected
        if (!selectedSize) return alert("Please select a size before adding to the cart.");
        // gets the product from the DB
        let cartProd = await getProduct(product.id.toString(), "cart");
        // checks if product exists in the cart collection
        if (!cartProd) cartProd = { ...product }; // creates a copy if product is not in the cart already

        // checks if the cart field exists on the product
        if (cartProd.cart) {
            const cartQty = Object.values(cartProd.cart).reduce((sum, n) => sum + n);
            // checks if there is enough stock available before adding
            if (cartQty >= product.stock)
                return alert(
                    "Unfortunately, we do not have enough stock to fulfill your request, please try again later.",
                );

            // increments the quantity if the size exists in the cart obj, otherwise sets it to 1
            cartProd.cart[selectedSize]
                ? cartProd.cart[selectedSize]++
                : (cartProd.cart[selectedSize] = 1);
            updateProduct(cartProd.id.toString(), cartProd, "cart");
        } else {
            // initialises the cart field with the specified size set to a quantity of 1
            cartProd.cart = { [selectedSize]: 1 };
            createProduct(cartProd.id.toString(), cartProd, "cart");
        }
    };

    return (
        <main>
            <h1 className={style.ProductPage__Heading}>Product Info</h1>
            <div className={style.ProductPage}>
                <img className={style.ProductPage__Image} src={product.image} alt="Product" />

                <span className={style.ProductPage__Content}>
                    <h3>{product.title}</h3>
                    <h4>{product.category}</h4>
                    <p className={style.ProductPage__Description}>{product.description}</p>
                    <p className={style.ProductPage__Price}>AU${product.price?.toFixed(2)}</p>
                    <p>
                        Rating: {product.rating?.rate} stars - {product.rating?.count} reviews
                    </p>
                    <p>Stock: {product.stock}</p>

                    <select name="size" defaultValue="placeholder" onChange={handleSelect}>
                        <option value="placeholder" hidden>
                            Please select a size
                        </option>
                        {product.variants?.map((variant) => (
                            <option key={variant} value={variant}>
                                {variant}
                            </option>
                        ))}
                    </select>

                    <FontAwesomeIcon
                        icon={faCartPlus}
                        size="3x"
                        onClick={handleCartAdd}
                        className={style.ProductPage__Icon}
                    />
                    <FontAwesomeIcon
                        icon={faHeart}
                        size="3x"
                        onClick={handleFav}
                        className={favIconStyle}
                    />
                </span>
            </div>
        </main>
    );
};

export default ProductPage;
