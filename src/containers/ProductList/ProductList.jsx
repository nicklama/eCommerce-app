import style from "./ProductList.module.scss";
import Product from "../../components/Product/Product";

const ProductList = ({ products }) => {
    return (
        <div>
            <h2 className={style.ProductList__Heading}>Browse our range</h2>
            <div className={style.ProductList}>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
