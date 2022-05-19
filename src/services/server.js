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

// Seed Firestore DB with products data
const seedProducts = async () => {
    const collectionRef = firestore.collection("products");

    const data = await collectionRef.get();

    if (!data.empty) return;

    const products = await getFakeProds();

    const variants = ["XS", "S", "M", "L", "XL"];
    const stock = 10;
    const prodsWithVariants = products.map((prod) => {
        return { ...prod, variants, stock };
    });

    // const promiseArr = prodsWithVariants.map(async (prod) => await collectionRef.add(prod));

    const promiseArr = prodsWithVariants.map(
        async (prod) => await collectionRef.doc(prod.id.toString()).set(prod),
    );
    await Promise.all(promiseArr);
};

// Get Firestore data using collectionName input
export const getFirestoreData = async (collectionName) => {
    seedProducts();
    const collectionRef = firestore.collection(collectionName);

    const data = await collectionRef.get();

    const documents = data.docs;

    return documents.map((doc) => doc.data());
};

// Updating product details
export const updateProduct = async (id, updatedRecord, collectionName) => {
    const collectionRef = firestore.collection(collectionName);
    const docRef = collectionRef.doc(id);
    await docRef.update(updatedRecord);
};

// Create new product
export const createProduct = async (id, product, collectionName) => {
    const collectionRef = firestore.collection(collectionName);
    const docRef = collectionRef.doc(id);
    await docRef.set(product);
};

// Checking a product exists
export const getProduct = async (id, collectionName) => {
    const collectionRef = firestore.collection(collectionName);
    const docRef = collectionRef.doc(id);
    return (await docRef.get()).data();
};

// Deleting a product
export const delProduct = async (id, collectionName) => {
    const docRef = getDocRef(id, collectionName);
    await docRef.delete();
};

// Getting a Firestore Document Reference
const getDocRef = (id, collectionName) => {
    return firestore.collection(collectionName).doc(id);
};
