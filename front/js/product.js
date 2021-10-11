let params = new URL(document.location).searchParams;
let id = params.get("id");

const getProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => console.log(data) ); 
};
getProduct();