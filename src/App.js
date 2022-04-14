import style from "./App.module.scss";
import { useEffect, useState } from "react";
import Header from "./containers/Header/Header";
import ProductList from "./containers/ProductList/ProductList";
import { getFirestoreData } from "./services/server";

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

    return (
        <main>
            <Header />
            <ProductList products={products} />
        </main>
    );
};

export default App;
