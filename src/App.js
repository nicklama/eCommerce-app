import "./App.module.scss";
import { useEffect, useState } from "react";
import { getFirestoreData } from "./services/server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import Navbar from "./containers/Navbar/Navbar";
import Cart from "./containers/Cart/Cart";

const App = () => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const myData = await getFirestoreData("products");
        setProducts(myData);
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(products);

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
                <Route path="/product/:prodID" element={<ProductPage products={products} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
