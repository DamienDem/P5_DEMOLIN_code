let params = new URL(document.location).searchParams;
let id = params.get("id");
let product = [];
const productImage = document.querySelector('.item__img');
const produtcTitle = document.getElementById('title');
const produtcPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const colorSelect = document.getElementById('colors');
console.log(productImage,produtcTitle,produtcPrice,productDescription,colorSelect);

// Récupération des id dans l'URL
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => product = data  ); 
    console.log(product)
};
getProduct();
const productDisplay = async () => {
    await getProduct();
    productImage.innerHTML = `<img src= "${product.imageUrl}" alt="${product.altTxt}, ${product.name}">`;
    produtcTitle.innerHTML = `${product.name}`;
    produtcPrice.innerHTML = `${product.price}`;
    productDescription.innerHTML = `${product.description}`;
    colorSelect.innerHTML = product.colors.map((color) =>
     `
     <option value="${color}"> ${color} </option>S
    `);
};
productDisplay();
