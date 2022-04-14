import style from "./ProductList.module.scss";
import Product from "../../components/Product/Product";

const ProductList = ({ products }) => {
    return (
        <div className={style.ProductList}>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
