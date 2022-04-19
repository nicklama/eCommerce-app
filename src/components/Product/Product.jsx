import { Link } from "react-router-dom";
import style from "./Product.module.scss";

const Product = ({ product }) => {
    const prodPath = `/product/${product.id}`;

    return (
        <Link to={prodPath} className={style.Product}>
            <img className={style.Product__Image} src={product.image} alt="Product" />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <p>
                Rating: {product.rating.rate} stars - {product.rating.count} reviews
            </p>
        </Link>
    );
};

export default Product;
