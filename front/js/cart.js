
const cartItems = document.getElementById('cart__items');
const displayProductInCart = () => {
    let productInCart = JSON.parse(localStorage.cart);
    console.log(productInCart);
    cartItems.innerHTML = productInCart.map((product) => 
    `
    <article class="cart__item" data-id="${product.productId}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price} €</p>
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
    ).join("")


}
displayProductInCart();