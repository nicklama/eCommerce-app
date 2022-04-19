import "./App.module.scss";
import { useEffect, useState } from "react";
import { getFirestoreData } from "./services/server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";

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
    // console.log(featuredProducts);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home products={products} featuredProducts={featuredProducts} />}
                />
                <Route path="/product/:prodID" element={<ProductPage products={products} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
