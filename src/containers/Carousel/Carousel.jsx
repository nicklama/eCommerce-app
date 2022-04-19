import style from "./Carousel.module.scss";
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct";
import { useState } from "react";

const Carousel = ({ featuredProducts }) => {
    const [productIndex, setProductIndex] = useState(0);

    const handleIndexInc = () =>
        productIndex === 2 ? setProductIndex(0) : setProductIndex(productIndex + 1);

    const handleIndexDec = () =>
        productIndex === 0 ? setProductIndex(2) : setProductIndex(productIndex - 1);

    return (
        <div className={style.Carousel}>
            <h2>Featured Products</h2>
            <CarouselProduct product={featuredProducts[productIndex]} />

            <button className={style.Carousel__Prev} onClick={handleIndexInc}>
                &#10094;
            </button>
            <button className={style.Carousel__Next} onClick={handleIndexDec}>
                &#10095;
            </button>

            <div>
                <button className={style.Carousel__Dot} onClick={() => setProductIndex(0)}></button>
                <button className={style.Carousel__Dot} onClick={() => setProductIndex(1)}></button>
                <button className={style.Carousel__Dot} onClick={() => setProductIndex(2)}></button>
            </div>
        </div>
    );
};

export default Carousel;
