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
//let productInCart = false;
let color;
let quantityAdd;

// Récupération du produit avec l'ID
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => product = data  ); 
    console.log(product)
    cart = JSON.parse(localStorage.getItem('cart'));
};
//getProduct();

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
//productDisplay();

// Si le local storage contient une valeur la récupérer et l'jouter dans l'array cart
const addToCart = async () => {
    await productDisplay();
    addToBasket.addEventListener('click', () => {
        let productAdd = {
            name: `${product.name}`,
            productId : id,
            imageUrl : `${product.imageUrl}`,
            alt :`${product.altTxt}`,
            colorProduct : colorSelect.value,
            quantityTotal : parseInt(quantitySelect.value,10), 
            price: `${product.price}`
        };
           
const addInCart = () => {

    if(cart)
    {
         productInCart = false;
        for(let i=0; i<cart.length ; i++)
        {
            if(cart[i].productId == productAdd.productId && cart[i].colorProduct == productAdd.colorProduct)
            {
                cart[i].quantityTotal += productAdd.quantityTotal;
                productInCart = true;
                console.log('même couleur: changement de la quantite');
            }
        }
        if(!productInCart)
        {
            cart.push(productAdd);
            console.log('ajoute un produit au panier');
        }
        
    }
    else
    {
        cart = [productAdd];
        console.log('le panier est vide, ajoute un premier produit');
    }
   
   localStorage.setItem('cart',JSON.stringify(cart));   
}
addInCart();









    });
}
addToCart();

localStorage.removeItem('cart')
