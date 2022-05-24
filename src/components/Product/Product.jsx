import { Link } from "react-router-dom";
import style from "./Product.module.scss";

const Product = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className={style.Product}>
            <img className={style.Product__Image} src={product.image} alt="Product" />
            <h4>{product.title}</h4>
            <p>${product.price.toFixed(2)}</p>
            <p>
                Rating: {product.rating.rate} stars - {product.rating.count} reviews
            </p>
        </Link>
    );
};

export default Product;
