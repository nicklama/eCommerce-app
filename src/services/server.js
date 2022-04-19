import firestore from "./firebase";

// Getting fakestore API data - https://fakestoreapi.com/

const getFakeProds = async () => {
    const response = [
        await fetch("https://fakestoreapi.com/products/category/men's%20clothing"),
        await fetch("https://fakestoreapi.com/products/category/women's%20clothing"),
    ];
    // const promises = await Promise.all(response);

    const promiseArr = response.map((promise) => promise.json());

    const data = await Promise.all(promiseArr);

    return data.flat();
};

const seedProducts = async () => {
    const collectionRef = firestore.collection("products");

    const data = await collectionRef.get();

    if (!data.empty) return;

    const products = await getFakeProds();

    const variants = ["XS", "S", "M", "L", "XL"];
    const prodsWithVariants = products.map((prod) => {
        return { ...prod, variants };
    });

    const promiseArr = prodsWithVariants.map(async (prod) => await collectionRef.add(prod));
    await Promise.all(promiseArr);
};

export const getFirestoreData = async (collectionName) => {
    seedProducts();
    const collectionRef = firestore.collection(collectionName);

    const data = await collectionRef.get();

    const documents = data.docs;

    return documents.map((doc) => doc.data());
};
