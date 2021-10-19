
const cartItems = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.cart);
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
const total = async () => {
  await displayProductInCart();
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

 //-----------------------
 // FORMULAIRE
 //---------------------

const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"] , input[type="email"]'
);
console.log(inputs);
console.log(form);
let name,firstName,address,city, email;
const container = document.querySelector(".cart__order__form__question");

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
        case "lastName":
        lastNameChecker(e.target.value);
        break;
        case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

const errorDisplay = (tag, message) => {
  const errorMessage = document.getElementById(tag +"ErrorMsg");
  errorMessage.textContent = message;
};

const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("firstName", "Le Prénom doit faire entre 3 et 20 caractères");
    firstName = null;
  } else if (!value.match(/^[a-zA-Z. -]*$/)) {
    errorDisplay("firstName","Le Prénom ne doit pas contenir de caractères spéciaux");
    firstName = null;
  } else { 
    errorDisplay("firstName", "");
    firstName = value;
  }
};
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("lastName", "Le Nom doit faire entre 3 et 20 caractères");
    firstName = null;
  } else if (!value.match(/^[a-zA-Z. -]*$/)) {
    errorDisplay("lastName","Le Nom ne doit pas contenir de caractères spéciaux");
    firstName = null;
  } else { 
    errorDisplay("lastName", "");
    firstName = value;
  }
};
const addressChecker = (value) => {
  if (value.length > 0 && (value.length < 10 || value.length > 40)) {
    errorDisplay("address", "L'adresse doit faire entre 10 et 40 caractères");
    address = null;
  } else if (!value.match(/^[a-zA-Z0-9 _.-]*$/)) {
    errorDisplay("address","L'adresse ne doit pas contenir de caractères spéciaux");
    address = null;
  } else {
    errorDisplay("address", "")
    address = value;
  }
};
const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("city", "Le nom de la ville doit faire entre 3 et 20 caractères");
    city = null;
  } else if (!value.match(/^[0-9]{5,}[a-zA-Z _.-]*$/)) {
    errorDisplay("city","Indiquer le nom de la ville avec le code postal et sans caractéres spéciaux");
    city = null;
  } else {
    errorDisplay("city", "")
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

/*
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée !");
  } else {
    alert("veuillez remplir correctement les champs");
  }
});*/


