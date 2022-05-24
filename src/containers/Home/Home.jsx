import Carousel from "../Carousel/Carousel";
import Header from "../../components/Header/Header";
import ProductList from "../ProductList/ProductList";

const Home = ({ featuredProducts, products }) => {
    return (
        <main>
            <Header />
            <Carousel featuredProducts={featuredProducts} />
            <ProductList products={products} />
        </main>
    );
};

export default Home;
