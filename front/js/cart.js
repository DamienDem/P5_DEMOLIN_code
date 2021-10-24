
const cartItems = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.cart);
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');

const total = async  () => {
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
                      <p class="deleteItem" data-settings="${product.name}${product.colorProduct}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `
  ).join(""); 
};

const quantityChange =  () => {
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

/*const deleteProduct =  () => {
  const deleteItem = document.getElementsByClassName('deleteItem');
    for(let i = cart.length -1 ; i >= 0 ; i--)
    {
      deleteItem[i].addEventListener ('click', (e) =>
     { 
       e.target.closest('article').remove();
       delete cart[i];
      });
    }
  };
  deleteProduct();*/
  /*const deleteProduct =  () => {
    const deleteItem = document.getElementsByClassName('deleteItem');
      for(let i = cart.length -1 ; i >= 0 ; i--)
      {
        deleteItem[i].addEventListener ('click', (e) =>
       { 
         e.target.closest('article').remove();
         cart.splice(i,1);
        });
      }
    };
    deleteProduct();*/
    const deleteProduct =  () => {
      const deleteItem = document.getElementsByClassName('deleteItem');
        for(let i = cart.length -1 ; i >= 0 ; i--)
        {
          deleteItem[i].addEventListener ('click', (e) =>
         { 
           e.target.closest('article').remove();
           cart = cart.filter(item => item != cart[i]);
           return cart;
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
let lastName,firstName,address,city, email;

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
    lastName = null;
  } else if (!value.match(/^[a-zA-Z. -]*$/)) {
    errorDisplay("lastName","Le Nom ne doit pas contenir de caractères spéciaux");
    lastName = null;
  } else { 
    errorDisplay("lastName", "");
    lastName = value;
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
const passOrder = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (lastName && firstName && address && city && email ) {
        contact = {
        lastName,
              firstName,
              address,
              city,
              email,
      };
      let products = [];
      cart.map((product) => {
        products.push(product.productId);
      });
      const order = {
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body :JSON.stringify({
              contact ,
              products,
          }),
        mode : "cors",
        credentials: "same-origin"
      };
      fetch("http://localhost:3000/api/products/order", order)
      .then((result) => result.json())
      .then((dataOrder) =>
      {
        console.log(dataOrder.orderId);
        window.location.href = "./confirmation.html? Id="+ dataOrder.orderId ;
        localStorage.clear() 
      } 
      );
      alert("Commande validée !");
    } else {
      alert("veuillez remplir correctement les champs");
    }
  });
}
passOrder();
