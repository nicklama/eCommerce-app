import firestore from "./firebase";

// Getting Fake Store API data - https://fakestoreapi.com/
const getFakeProds = async () => {
    // fetching men's and women's clothing products
    const response = [
        await fetch("https://fakestoreapi.com/products/category/men's%20clothing"),
        await fetch("https://fakestoreapi.com/products/category/women's%20clothing"),
    ];
    const promiseArr = response.map((promise) => promise.json()); // JSONs each response
    const data = await Promise.all(promiseArr); // resolves all promises
    return data.flat(); // removes the nesting of the two response arrays of objects
};

// Seeding Firestore DB with products data
const seedProducts = async () => {
    // returns the collection reference of products in firestore
    const collectionRef = firestore.collection("products");
    // gets a QuerySnapshot of the collection
    const data = await collectionRef.get();

    // if the DB contains data, function will exit and not need to seed the DB
    if (!data.empty) return;

    const products = await getFakeProds();

    const variants = ["XS", "S", "M", "L", "XL"]; // sizing variants
    const stock = 10; // stock amount for each product
    const prodsWithVariants = products.map((prod) => {
        return { ...prod, variants, stock };
    });

    // creates and sets new documents using the ID from the product objects
    const promiseArr = prodsWithVariants.map(
        async (prod) => await collectionRef.doc(prod.id.toString()).set(prod),
    );
    await Promise.all(promiseArr);
};

// Getting Firestore data using of a specified collection
export const getFirestoreData = async (collectionName) => {
    seedProducts(); // seeds the DB if required
    const collectionRef = firestore.collection(collectionName);
    const data = await collectionRef.get();
    // returns an array of documents from the QuerySnapshot
    const documents = data.docs;
    // maps through the document array and gets each document data as an object
    return documents.map((doc) => doc.data());
};

// Getting a Firestore Document Reference
const getDocRef = (id, collectionName) => {
    // gets the document reference using an ID from a collection
    return firestore.collection(collectionName).doc(id);
};

// Create new product
export const createProduct = async (id, product, collectionName) => {
    const docRef = getDocRef(id, collectionName);
    await docRef.set(product);
};

// Reading/getting a product
export const getProduct = async (id, collectionName) => {
    const docRef = getDocRef(id, collectionName);
    return (await docRef.get()).data();
};

// Updating product details
export const updateProduct = async (id, updatedRecord, collectionName) => {
    const docRef = getDocRef(id, collectionName);
    await docRef.update(updatedRecord);
};

// Deleting a product
export const delProduct = async (id, collectionName) => {
    const docRef = getDocRef(id, collectionName);
    await docRef.delete();
};
