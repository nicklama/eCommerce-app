import style from "./ProductPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createProduct, getProduct, updateProduct } from "../../services/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductPage = ({ products }) => {
    const { prodID } = useParams();
    const [product, setProduct] = useState({});
    const [isFav, setIsFav] = useState(false);
    const [selectedSize, setSize] = useState("");

    useEffect(() => {
        // casting ID as string to check the strict equality
        setProduct(products.find((prod) => String(prod.id) === prodID));
    }, [products, prodID]);

    useEffect(() => {
        if (product.hasOwnProperty("isFav")) setIsFav(product.isFav);
    }, [product]);

    const handleFav = () => {
        setIsFav(!isFav);
        console.log("fav has been toggled");
        product.isFav = !isFav;
        updateProduct(product?.id.toString(), product, "products");
    };

    // useEffect(() => {
    //     // console.log(isFav, product.isFav);
    //     if (!product.id) return;
    //     updateProduct(product.id?.toString(), { ...product, isFav }, "products");
    // }, [isFav]);

    const favIconStyle = isFav
        ? `${style.ProductPage__Icon} ${style.ProductPage__Icon_red}`
        : style.ProductPage__Icon;

    const handleSelect = (e) => {
        setSize(e.target.value);
    };

    const handleCartAdd = async () => {
        // exits if no size has been selected
        if (!selectedSize) return;
        let cartProd = await getProduct(product.id.toString(), "cart");
        // checks if product exists in the cart collection
        if (!cartProd) cartProd = { ...product }; // creates a copy

        if (cartProd.cart) {
            const cartQty = Object.values(cartProd.cart).reduce((sum, n) => sum + n);
            // checks if there is enough stock available
            if (cartQty >= product.stock)
                return alert(
                    "Unfortunately, we do not have enough stock to fulfill your request, please try again later.",
                );

            cartProd.cart[selectedSize]
                ? cartProd.cart[selectedSize]++
                : (cartProd.cart[selectedSize] = 1);
            updateProduct(cartProd.id.toString(), cartProd, "cart");
        } else {
            cartProd.cart = { [selectedSize]: 1 };
            createProduct(cartProd.id.toString(), cartProd, "cart");
        }

        console.log(cartProd.cart);
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
                    <p className={style.ProductPage__Price}>AU${product.price}</p>
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
                    {/* <button>Add to Cart</button> */}
                    <FontAwesomeIcon
                        icon={faCartPlus}
                        size="3x"
                        onClick={handleCartAdd}
                        className={style.ProductPage__Icon}
                    />

                    {/* <div className={style.ProductPage__FavIcon} onClick={handleFav}>
                        <img
                            className={favIconStyle}
                            src="https://img.icons8.com/material/64/000000/like--v1.png"
                            alt="favourite-icon"
                        />
                    </div> */}
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
