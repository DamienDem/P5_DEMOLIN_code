
const cartItems = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.cart);
`<div class="cart__price">
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>`
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
const total = async () => {
  await displayProductInCart();
  // console.log(arrayNumber.reduce((x, y) => x + y)); additione tout les éléments d'un tableau
  let totalItems = 0;
  let priceItems = 0;
  for(let i = 0; i<cart.length; i++)
  {
    totalItems += cart[i].quantityTotal
    priceItems = priceItems + cart[i].quantityTotal * cart[i].price;
  }
  totalQuantity.textContent = totalItems;
  totalPrice.textContent = priceItems;
}
total();
function displayProductInCart() {
 // console.log(cart);
  cartItems.innerHTML = cart.map((product) => `
    <article class="cart__item"  id="${product.productId}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price} €</p>
                    <p> ${product.colorProduct}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${product.quantityTotal} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantityTotal}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `
  ).join("");
  //total();
  
};

const quantityChange = async () => {
  await displayProductInCart();
  let itemQuantity = document.getElementsByClassName('itemQuantity');
  document.body.addEventListener('change' , () => {
    for(let i=0; i<itemQuantity.length ; i++)
    {
      let quantitySelect = parseInt(itemQuantity[i].value,10) ;
      cart[i].quantityTotal = quantitySelect;
      let qte = itemQuantity[i].previousElementSibling;
      qte.textContent = "Qté: " +quantitySelect;    
      localStorage.setItem('cart' , JSON.stringify(cart));
     // console.log(cart);
    }
    total();
  });
} 
quantityChange();
const deleteItem = document.getElementsByClassName('deleteItem');
const deleteProduct = async () => {
  await displayProductInCart();
  //console.log(cart);
  for(let i = 0 ; i < cart.length ; i++)
  {
    const cartItem = document.getElementsByClassName('cart__item');
    deleteItem[i].addEventListener ('click', () => {
      if( i == 0)
      {
        cart.splice(i ,1 );
        cartItem[i].remove();
        console.log('i=0');
        console.log(cart);

      } else 
      {
        cart.splice(i ,1 );
        cartItem[i].remove();
        i--;
        console.log('i !=0');
        console.log(cart);
        console.log(i);
      }
     localStorage.setItem('cart' , JSON.stringify(cart));
     total();
    }); 
  }
};
deleteProduct();

