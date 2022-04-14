import style from "./Product.module.scss";

const Product = ({ product }) => {
    return (
        <div className={style.Product}>
            <img className={style.Product__Image} src={product.image} alt="Product Image" />
            <h3>{product.title}</h3>
            <h4>{product.category}</h4>
            <p>${product.price}</p>
            <p>
                Rating: {product.rating.rate} stars - {product.rating.count} reviews
            </p>
            <select name="" id="">
                <option value="">Please select a size</option>
            </select>
            <button>Add to Cart</button>
        </div>
    );
};

export default Product;
