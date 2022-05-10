//Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

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

      .then(() => {
        // Etape 9: Modification de la quantité

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
              alert("Désolé, une erreur s'est produite, nous n'avons pas pu finalier votre commande, veuillez réessayer plus tard");
            }
            location.reload();
          });
        });
      });


  });

  
} // Fermeture du else du local storage sur la gestion du panier ligne11
