const products = [
    {
        id: "redshoe",
        description: "Red Shoe",
        price: 42.12,
        reviews: []
    },
    {
        id: "bluejean",
        description: "Blue Jeans",
        price: 55.55,
        reviews: []
    }
]

function getProductAll() {
    return products;
}

function getProdutsByPrice(min, max) {
    return products.filter(product => product.price >= min && product.price <= max);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function addNewProduct(id, description, price) {
    const newProduct = {
        id,
        description,
        price,
        reviews: []
    }
    products.push(newProduct);
    return newProduct;
}

function addNewProductReview(id, rating, comment) {
    const newProductReview = {
        rating,
        comment
    }
    const product = getProductById(id);
    if (product) {
        product.reviews.push(newProductReview);
        return newProductReview;
    }
}

module.exports = {
    getProductAll,
    getProdutsByPrice,
    getProductById,
    addNewProduct,
    addNewProductReview
}