
const items = document.getElementById('items');
let products = [];
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => products = data );
};
const productDisplay = async () => {
    await getProduct ();

    items.innerHTML = products.map((product) => 
    `
    <a href="./product.html?id=${product._id}">
    <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
    </article>
    </a>
    `)
}
productDisplay();
