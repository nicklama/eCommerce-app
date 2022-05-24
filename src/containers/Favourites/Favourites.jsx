import style from "../ProductList/ProductList.module.scss";
import Product from "../../components/Product/Product";

const Favourites = ({ favProducts }) => {
    return (
        <main>
            <h1 className={style.ProductList__Heading_Fav}>Your Favourited Products</h1>
            <div className={style.ProductList}>
                {favProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
};

export default Favourites;
