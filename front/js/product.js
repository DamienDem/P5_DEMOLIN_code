let params = new URL(document.location).searchParams;
let id = params.get("id");
let product = [];

// Récupération des id dans l'URL
const getProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => product = data  ); 
    console.log(product)
};
getProduct();