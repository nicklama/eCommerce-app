import style from "./ProductPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = ({ products }) => {
    const { prodID } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct(products.find((prod) => prod.id == prodID));
    }, [products, prodID]);

    return (
        <main>
            <h1 className={style.ProductPage__Heading}>Product Info</h1>
            <div className={style.ProductPage}>
                <img className={style.ProductPage__Image} src={product.image} alt="Product" />

                <span className={style.ProductPage__Content}>
                    <h3>{product.title}</h3>
                    <h4>{product.category}</h4>
                    <p className={style.ProductPage__Price}>AU${product.price}</p>
                    <p>
                        Rating: {product.rating?.rate} stars - {product.rating?.count} reviews
                    </p>

                    <select name="size" defaultValue="placeholder">
                        <option value="placeholder" hidden>
                            Please select a size
                        </option>
                        {product.variants?.map((variant) => (
                            <option key={variant} value={variant}>
                                {variant}
                            </option>
                        ))}
                    </select>
                    <button>Add to Cart</button>
                </span>
            </div>
        </main>
    );
};

export default ProductPage;
