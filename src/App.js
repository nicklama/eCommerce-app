import "./App.module.scss";
import { useEffect, useState } from "react";
import { getFirestoreData } from "./services/server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./containers/Cart/Cart";
import Favourites from "./containers/Favourites/Favourites";

const App = () => {
    const [products, setProducts] = useState([]);
    const [favProducts, setFavProducts] = useState([]);

    // getting product data from the Firestore backend
    const getData = async () => {
        const myData = await getFirestoreData("products");
        setProducts(myData);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setFavProducts(products.filter((prod) => prod.isFav));
    }, [products]);

    const featuredProducts = products.filter((prod) => prod.isFeatured);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home products={products} featuredProducts={featuredProducts} />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/product/:prodID"
                    element={<ProductPage products={products} setProducts={setProducts} />}
                />
                <Route path="/favourites" element={<Favourites favProducts={favProducts} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
