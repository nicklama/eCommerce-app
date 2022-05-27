import { Link } from "react-router-dom";
import style from "./CarouselProduct.module.scss";

const CarouselProduct = ({ product }) => {
    return (
        <div className={style.CarouselProduct}>
            <Link to={`product/${product?.id}`} className={style.CarouselProduct__Link}>
                <img className={style.CarouselProduct__Image} src={product?.image} alt="Product" />
            </Link>
            <span className={style.CarouselProduct__Text}>
                <p>{product?.title}</p>
                <p>${product?.price}</p>
            </span>
        </div>
    );
};

export default CarouselProduct;
