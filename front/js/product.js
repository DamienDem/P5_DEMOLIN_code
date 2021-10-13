let params = new URL(document.location).searchParams;
let id = params.get("id");
let product = [];
const productImage = document.querySelector('.item__img');
const produtcTitle = document.getElementById('title');
const produtcPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const colorSelect = document.getElementById('colors');
const addToBasket = document.getElementById('addToCart');
const quantitySelect = document.getElementById("quantity");
let cart = [];

// Récupération du produit avec l'ID
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => product = data  ); 
    console.log(product)
};
getProduct();

// Affichage du produit
const productDisplay = async () => {
    await getProduct();
    productImage.innerHTML = `<img src= "${product.imageUrl}" alt="${product.altTxt}, ${product.name}">`;
    produtcTitle.innerHTML = `${product.name}`;
    produtcPrice.innerHTML = `${product.price}`;
    productDescription.innerHTML = `${product.description}`;
    colorSelect.innerHTML = product.colors.map((color) =>
     `
     <option value="${color}"> ${color} </option>
    `)
    .join("");
};
productDisplay();

// Si le local storage contient une valeur la récupérer et l'jouter dans l'array cart
if (localStorage.getItem('cart') !== null) {
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log('localstorage récupéré');
};

// Si le panier ne contient pas l'id de notre produit ajoute le produit au panier
if(cart.every((id) => id != `${id}`)){
    cart.push(product);
    console.log(cart);
    console.log('ajoute un nouveau produit au panier');
};

// Si l'ID et la couleur sont déja présent dans le panier ajoute la quantité sélectionné au panier
if(cart.every((id) => id == `${id}`) && cart.every((color) => color == `${color}`)) {
    console.log(cart);
    console.log('ajoute une nouelle couleur');
};


