import style from "./Carousel.module.scss";
import CarouselProduct from "../../components/CarouselProduct/CarouselProduct";
import { useState } from "react";

const Carousel = ({ featuredProducts }) => {
    const [productIndex, setProductIndex] = useState(0);

    // increments the selected index of the featured products carousel
    const handleIndexInc = () =>
        // if the index is currently the last position it will loop back to the start
        productIndex === 2 ? setProductIndex(0) : setProductIndex(productIndex + 1);

    const handleIndexDec = () =>
        // if the user decrements from the start of the array then it loops to the end
        productIndex === 0 ? setProductIndex(2) : setProductIndex(productIndex - 1);

    return (
        <div className={style.Carousel}>
            <h2>Featured Products</h2>
            <CarouselProduct product={featuredProducts[productIndex]} />

            <button className={style.Carousel__Prev} onClick={handleIndexDec}>
                &#10094;
            </button>
            <button className={style.Carousel__Next} onClick={handleIndexInc}>
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
