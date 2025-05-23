/********** DISPLAYING CART CONTENT ON THE CART PAGE **********/

/* Retrieving of cart with the getCart function */
let cart = getCart();

/* Retrieving of the element that will contain the cart details */
const cartList = document.getElementById("cart__items");

/* Retrieving of the elements that will contain totals and order form */
const cartHeading = document.querySelector("h1");
const totalDisplay = document.querySelector(".cart__price p");
const orderForm = document.querySelector(".cart__order");

/* Retrieving of the elements that will display total price and total quantity of products in cart */
let totalProductsQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
/* Initializing totalCartPrice that will be updated later with the result returned by the getTotalPrice function*/
let totalCartPrice = 0;

/* Browsing the cart with a for of loop */
for (let product of cart) {
  /* For each product, retrieving of the id, color, quantity and name (name for error display only) */
  let productId = product.id;
  let productColor = product.color;
  let productQuantity = product.quantity;
  let productName = product.name;
  /* Sending HTTP request to the API with fetch() to get the product details */
  fetch(`http://localhost:3001/api/products/${productId}`)
    /* Returning the response in a JSON format */
    .then((response) => response.json())
    /* Defining API response as productDetails and setting action to be executed for each product of the cart */
    .then((productDetails) => {
      /* Creating the article element, setting attributes, adding the cart__item class and defining it as child of the cartList element */
      let productArticle = document.createElement("article");
      productArticle.classList.add("cart__item");
      productArticle.setAttribute("data-id", productId);
      productArticle.setAttribute("data-color", productColor);
      cartList.appendChild(productArticle);

      /* Creating the productImgContainer element, adding the cart__item__img class and defining it as child of the productArticle element */
      let productImgContainer = document.createElement("div");
      productImgContainer.classList.add("cart__item__img");
      productArticle.appendChild(productImgContainer);

      /* Creating the productImg element, setting attributes and defining it as child of the productImgContainer element */
      let productImg = document.createElement("img");
      productImg.setAttribute("src", productDetails.imageUrl);
      productImg.setAttribute("alt", productDetails.altTxt);
      productImgContainer.appendChild(productImg);

      /* Creating the productContent element, adding the cart__item__content class and defining it as child of the productArticle element */
      let productContent = document.createElement("div");
      productContent.classList.add("cart__item__content");
      productArticle.appendChild(productContent);

      /* Creating the productContentDescription element, adding the cart__item__content__description class and defining it as child of the productContent element */
      let productContentDescription = document.createElement("div");
      productContentDescription.classList.add("cart__item__content__description");
      productContent.appendChild(productContentDescription);

      /* Creating the productName element, inserting text content and defining it as child of the productContentDescription element */
      let productName = document.createElement("h2");
      productName.textContent = productDetails.name;
      productContentDescription.appendChild(productName);

      /* Creating the poductColorPicked element, inserting color picked by user on the previous step and defining it as child of the productContentDescription element */
      let productColorPicked = document.createElement("p");
      productColorPicked.textContent = productColor;
      productContentDescription.appendChild(productColorPicked);

      /* Creating the productPrice element, inserting value returned by the API, followed by the € symbol using backticks and defining it as child of the productContentDescription element */
      let productPrice = document.createElement("p");
      productPrice.textContent = `${productDetails.price} €`;
      productContentDescription.appendChild(productPrice);

      /* Creating the productContentSettings element, adding the crt__item__content__settings class and defining it as child of the productContent element */
      let productContentSettings = document.createElement("div");
      productContentSettings.classList.add("cart__item__content__settings");
      productContent.appendChild(productContentSettings);

      /* Creating the productQuantitySettings element, adding the cart__item__content__settings__quantity class and defining it as child of the productContentSettings element */
      let productQuantitySettings = document.createElement("div");
      productQuantitySettings.classList.add("cart__item__content__settings__quantity");
      productContentSettings.appendChild(productQuantitySettings);

      /* Creating the productQuantityPickedLabel element, inserting text content and defining it as child of the productQuantitySettings element */
      let productQuantityPickedLabel = document.createElement("p");
      productQuantityPickedLabel.textContent = "Quantité : ";
      productQuantitySettings.appendChild(productQuantityPickedLabel);

      /* Creating the productQuantityPicked element, adding attributes, inserting quantity picked by user on the previous step and inserting it as child of the productQuantitySettings element */
      let productQuantityPicked = document.createElement("input");
      productQuantityPicked.setAttribute("type", "number");
      productQuantityPicked.setAttribute("name", "itemQuantity");
      productQuantityPicked.setAttribute("min", 1);
      productQuantityPicked.setAttribute("max", 100);
      productQuantityPicked.setAttribute("value", productQuantity);
      productQuantityPicked.classList.add("itemQuantity");
      productQuantitySettings.appendChild(productQuantityPicked);

      /* Creating the productDelete element, adding the cart__item__content__settings__delete class and defining it as child of the productContentSettings element */
      let productDelete = document.createElement("div");
      productDelete.classList.add("cart__item__content__settings__delete");
      productContentSettings.appendChild(productDelete);

      /* Creating the productDeleteButton element, adding the deleteItem class, inserting text content and defining it as child of the productDelete element */
      let productDeleteButton = document.createElement("p");
      productDeleteButton.classList.add("deleteItem");
      productDeleteButton.textContent = "Supprimer";
      productDelete.appendChild(productDeleteButton);

      /* Using the event listener to execute the removeFromCart action when the delete button is clicked on */
      productDeleteButton.addEventListener("click", function () {
        removeFromCart(product);
        /* Desplaying an alert to inform the user that the product has been removed */
        alert("L'article a été retiré de votre panier");
        /* Reloading the page */
        document.location.reload();
      });

      /********** DISPLAYING TOTAL AMOUNT OF PRODUCTS ON THE CART PAGE **********/

      /* Using the getNumberOfProduct function to display the total quantity on the page */
      totalProductsQuantity.textContent = getNumberOfProducts();
      /* Using the getTotalPrice function to display the total price on the page */
      totalPrice.textContent = getTotalPrice(productDetails, productQuantity);
      /* Defining current quantity picked as old quantity for later use on change event */
      let oldQuantity = Number(productQuantityPicked.value);

      /* Listening to change event on the quantity input and setting action de be executed */
      productQuantityPicked.addEventListener("change", () => {
        /* Defining new product quantity using the modifyQuantity function - Cart to be saved during this step with the modifyQuantity function */
        productQuantity = modifyQuantity(product,Number(productQuantityPicked.value));
        /* Using the modifyTotalPrice function to calculate the new price for each item, according to the quantity variation */
        totalPrice.textContent = modifyTotalPrice(productDetails,oldQuantity,Number(productQuantityPicked.value));
        /* Defining (new) current quantity picked as old quantity for later use on change event */
        oldQuantity = Number(productQuantityPicked.value);
        /* Retrieving total quantity in the cart using the getNumberOfProduct function */
        totalProductsQuantity.textContent = getNumberOfProducts();
      });
    })
    /* If the request to the API has failed, creating a message to be uploaded for each product to inform the user that something went wrong */
    .catch((error) => {
      console.log("Erreur dans le chargement du panier" + error);
      let cartErrorMessage = document.createElement("h2");
      cartErrorMessage.textContent = `L'article ${productName} de couleur ${productColor} que vous avez sélectionné semble inaccessible pour le moment.`;
      cartErrorMessage.style.textAlign = "center";
      cartErrorMessage.style.padding = "15px";
      cartList.appendChild(cartErrorMessage);
      /* Changing the text in totals element and removing order form from page */
      totalDisplay.textContent = "Il est impossible de procéder à la commande pour le moment. Nous vous invitons à réessayer ultérieurement";
      totalDisplay.style.textAlign = "center";
      orderForm.style.display = "none";
    });
}

/********** CHANGING PAGE STRUCTURE WHEN THE CART IS EMPTY **********/

/* Checking cart length. If the cart is empty : changing the heading, the text in totals element and removing order form from page */
if (cart.length === 0) {
  cartHeading.textContent = "Votre panier est vide";
  totalDisplay.innerHTML ='<a href="./index.html">Consulter notre catalogue</a>';
  totalDisplay.style.textAlign = "center";
  orderForm.style.display = "none";
}

/********** ORDER FORM MANAGEMENT **********/

/* Retrieving of form and submit button elements */
let form = document.querySelector(".cart__order__form");
let submitButton = document.querySelector("#order");

/* Adding pattern and placeholder attributes to each input and listening to input event to display a message (succes or error) in the element below each input */
form.firstName.setAttribute("pattern", "[a-z A-Z-']{2,50}");
form.firstName.setAttribute("placeholder", "Exemple : Martin");
form.firstName.addEventListener("input", () => {
  textValidity(form.firstName);
});
form.lastName.setAttribute("pattern", "[a-z A-Z-']{2,50}");
form.lastName.setAttribute("placeholder", "Exemple : Dupont");
form.lastName.addEventListener("input", () => {
  textValidity(form.lastName);
});
form.address.setAttribute("pattern", "[a-zA-Z 0-9'-]{2,50}");
form.address.setAttribute("placeholder", "Exemple : 1 rue des Petits Champs");
form.address.addEventListener("input", () => {
  adressValidity(form.address);
});
form.city.setAttribute("pattern", "[0-9]{5}[a-zA-Zéèôöîïûùü' -]{2,50}");
form.city.setAttribute("placeholder", "Exemple : 75020 Paris");
form.city.addEventListener("input", () => {
  cityValidity(form.city);
});
form.email.setAttribute("placeholder", "Exemple : exemple@mail.com");
form.email.addEventListener("input", () => {
  emailValidity(form.email);
});

/********** ORDER FORM SUBMIT **********/

/* Initializing the products array that will be sent to the API */
let products = [];

/* For each product in the cart, pushing the productId in the products array */
for (let product of cart) {
  products.push(product.id);
}

/* Listening to the submit event on the form - Preventing the submit action to reload the page with the prevendDefault method */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  /* Creating the contact object that will be sent to the API */
  let contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };
  /* Sending the contact object and the products array to the API */
  fetch("http://localhost:3001/api/products/order", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    /* Geting the response in a JSON format */
    .then((response) => response.json())
    /* Defining API response as orderDetails and setting action to be executed */
    .then((orderDetails) => {
      console.log("L'envoi du formulaire à bien été effectué");
      /* Getting the orderId element from the API response and asigning it into a variable for later use in the url */
      let orderId = orderDetails.orderId;
      console.log(orderId);
      if(orderId){
        /* Redirecting user on the confirmation page and adding orderId in the url */
        window.location.href = `./confirmation.html?id=${orderId}`;
        /* Clearing the cart */
        clearCart();
      }else{
        alert("Il semble y avoir un problème. Veuillez ré-essayer ultérieurement")
      }
    })
    .catch((error) => {
      /* Displaying an error message if the request sent to API is not successfully completed */
      console.log("L'envoi du formulaire à l'API a rencontré un problème" + error);
    });
});
