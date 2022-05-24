//*Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

const itemsHtml = document.getElementById('cart__items');

let product = [];

/////////////////////////////////////////////////////
if (localStorage.getItem('product') === null) {
  // Vérifier si il y a quelque chose dans le localStorage
  window.confirm('Votre panier est vide');
} else {
  // Gestion du panier
  let localStorageCart = JSON.parse(localStorage.getItem('product'));
  let totalQuantity = 0;
  let totalPrice = 0;

  localStorageCart.forEach((productLS) => {
    // Pour chaque produit dans le local Storage récupérer son id

    fetch(`http://localhost:3000/api/products/${productLS.id}`) // Requete à l'API de l'ID récupéré dans le local Storage
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then((productAPI) => {
        // Affichage du panier

        let priceTotalProductSelect = productAPI.price * productLS.quantity; //  Prix total d'un produit

        itemsHtml.innerHTML += `<article class="cart__item" data-id="${productLS.id}" data-color="${productLS.color}">
                    <div class="cart__item__img">
                      <img src="${productAPI.imageUrl}" alt="${productAPI.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${productAPI.name}</h2>
                        <p>Couleur Selectionnée : ${productLS.color}</p>
                            <div class = "cart__item__content__titlePrice">
                                <p>Prix Unitaire : ${productAPI.price} €</p>
                                <p> Prix Total : ${priceTotalProductSelect} € </p>
                             </div>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLS.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`;

        //  Nombre de produits commandés :
        totalQuantity += parseInt(productLS.quantity);
        document.getElementById(
          'totalQuantity'
        ).textContent = `${totalQuantity}`;

        //  Prix des produits commandés :
        totalPrice += priceTotalProductSelect;
        document.getElementById('totalPrice').textContent = `${totalPrice}`;

        // Récupère ID du produit à mettre dans un tableau pour passer la requete POST vers l'API
        product.push(productLS.id);
      })

      //* Etape 9: Modification de la quantité
      .then(() => {
        let inputsQuantity = document.querySelectorAll('.itemQuantity');

        inputsQuantity.forEach((input) => {
          input.addEventListener('change', (e) => {
            let articleHMTL = e.target.closest('article');
            let articleHTMLId = articleHMTL.dataset.id;
            let articleHTMLcolor = articleHMTL.dataset.color;
            // Trouver le premier article dans le local storage qui respecte la condition
            let articleChanged = localStorageCart.find(
              (e) => e.id === articleHTMLId && e.color === articleHTMLcolor
            );

            if (articleChanged !== undefined) {
              articleChanged.quantity = parseInt(e.target.value);

              if (articleChanged.quantity > 100) {
                alert('Attention, la quantité à été limitée à 100');
                e.target.value = 100;
                articleChanged.quantity = parseInt(e.target.value);
                localStorage.setItem(
                  'product',
                  JSON.stringify(localStorageCart)
                );
              } else if (articleChanged.quantity <= 0) {
                localStorageCart = localStorageCart.filter(
                  (e) =>
                    !(e.id === articleHTMLId && e.color === articleHTMLcolor)
                );
                articleHMTL.remove();
                localStorage.setItem(
                  'product',
                  JSON.stringify(localStorageCart)
                );

                if (localStorageCart.length < 1) {
                  localStorage.clear('product');
                }
              } else {
                localStorage.setItem(
                  'product',
                  JSON.stringify(localStorageCart)
                );
              }
            } else {
              localStorage.clear('product');
              alert(
                "Désolé, une erreur s'est produite, nous n'avons pas pu finalier votre commande, veuillez réessayer plus tard"
              );
            }
            location.reload();
          });
        });

        // ----- Suppression d'un article ----
        let inputsDelete = document.querySelectorAll('.deleteItem');

        inputsDelete.forEach((input) => {
          input.addEventListener('click', (e) => {
            let articleHMTL = e.target.closest('article');
            let articleHTMLId = articleHMTL.dataset.id;
            let articleHTMLcolor = articleHMTL.dataset.color;

            localStorageCart = localStorageCart.filter(
              (e) => !(e.id === articleHTMLId && e.color === articleHTMLcolor)
            );

            if (
              localStorageCart.find(
                (e) => e.id === articleHTMLId && e.color === articleHTMLcolor
              )
            ) {
              localStorage.clear('product');
              alert(
                "désolé une erreur s'est produite, nous n'avons pas pu finaliser votre commande, veuillez réessayer plus tard"
              );
            } else {
              articleHMTL.remove();
              localStorage.setItem('product', JSON.stringify(localStorageCart));

              if (localStorageCart.length < 1) {
                localStorage.clear('product');
              }
            }
            location.reload();
          });
        });
      }); //fermeture du .then ligne 72
  }); //Fermeture ligne 17
} // Fermeture du else du local storage sur la gestion du panier ligne11

//*Etape 10 : Passer la commande
//1.  Selection du bouton Commander
const btnOrder = document.querySelector('#order');

//2. Selection des inputs du formulaire
let firstNameInput = document.getElementById('firstName');
let lastNameInput = document.getElementById('lastName');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');

// 3. Validation des entrées
function RegexAlpha(value) {
  return /^[A-Za-zÀ-ž-'\s]+$/.test(value);
}

function RegexAlphaNum(value) {
  return /^[a-zA-ZÀ-ž0-9,'-\s]+$/.test(value);
}

function RegexEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/.test(value);
}
// Vérification du prénom
function checkFirstName() {
  if (RegexAlpha(firstNameInput.value)) {
    firstNameInput.style.border = 'medium solid #faa4a4';
    firstNameInput.nextElementSibling.textContent = '';
    return true;
  } else {
    firstNameInput.nextElementSibling.textContent =
      "Merci d'entrer un prénom conforme, Ex: Charles, Jean-Pierre, Jean Charles";
    firstNameInput.style.border = 'medium solid #faa4a4';
    return false;
  }
}

firstNameInput.addEventListener('change', () => {
  checkFirstName();
});

// Vérification du nom
function checkLastName() {
  if (RegexAlpha(lastNameInput.value)) {
    lastNameInput.style.border = 'medium solid #faa4a4';
    lastNameInput.nextElementSibling.textContent = '';
    return true;
  } else {
    lastNameInput.nextElementSibling.textContent =
      "Merci d'entrer un nom conforme, Ex: Dupond, Du-Wong, De Lassolle ";
    lastNameInput.style.border = 'medium solid #faa4a4';
    return false;
  }
}

lastNameInput.addEventListener('change', () => {
  checkLastName();
});

// Vérification de la ville
function checkCity() {
  if (RegexAlphaNum(cityInput.value)) {
    cityInput.style.border = 'medium solid #faa4a4';
    cityInput.nextElementSibling.textContent = '';
    return true;
  } else {
    cityInput.nextElementSibling.textContent =
      "Merci d'entrer une ville conforme, Ex: Paris, Paris-V, Paris 5ème";
    cityInput.style.border = 'medium solid #faa4a4';
    return false;
  }
}

cityInput.addEventListener('change', () => {
  checkCity();
});

// Vérification de l'adresse
function checkAddress() {
  if (RegexAlphaNum(addressInput.value)) {
    addressInput.style.border = 'medium solid #faa4a4';
    addressInput.nextElementSibling.textContent = '';
    return true;
  } else {
    addressInput.nextElementSibling.textContent =
      "Merci d'entrer une adresse conforme, Ex: 59 Avenue des tilleuls, Rue Jean-Jaures ";
    addressInput.style.border = 'medium solid #faa4a4';
    return false;
  }
}

addressInput.addEventListener('change', () => {
  checkAddress();
});

// Vérification de l'email
function checkEmail() {
  if (RegexEmail(emailInput.value)) {
    emailInput.style.border = 'medium solid #faa4a4';
    emailInput.nextElementSibling.textContent = '';
    return true;
  } else {
    emailInput.nextElementSibling.textContent =
      "Merci d'entrer un courriel conforme. Ex : contact@kanap.com";
    emailInput.style.border = 'medium solid #faa4a4';
    return false;
  }
}

emailInput.addEventListener('change', () => {
  checkEmail();
});

// Création du client
btnOrder.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    checkFirstName() &&
    checkLastName() &&
    checkCity() &&
    checkAddress() &&
    checkEmail()
  ) {
    const contact = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      email: emailInput.value,
    };

    //localStorage.setItem("contact", JSON.stringify(contact));

    if (localStorage.product === undefined) {
      alert(
        "Votre panier est vide, retrouvez nos produits sur la page d'Accueil"
      );
      location.href = './index.html';
    } else {
      PostAPI(contact, product);
    }
  } else {
    alert("Vérifiez la saisie du formulaire s'il vous plait");
    checkFirstName();
    checkLastName();
    checkCity();
    checkAddress();
    checkEmail();
  }
});

// Envoi à l'API du client et des produits + récupération du numéro de commande
function PostAPI(contact, products) {
  fetch(
    `http://localhost:3000/api/products/order`,

    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({contact, products}),
    }
  )
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (api) {
      location.href = `./confirmation.html?id=${api.orderId}`; // Redirige vers la page confirmation avec l'orderId pour pouvoir le récupérer sans le stocker
    })

    .catch(function (err) {
      alert(
        "Désolé une erreur s'est produite, nous n'avons pas pu finaliser votre commande, veuillez réessayer plus tard"
      );
      location.href = './index.html';
    });
}
