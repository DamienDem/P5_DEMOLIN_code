
const items = document.getElementById('items');
let products = [];
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => products = data );
};
