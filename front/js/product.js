/* Etape 4 : Création des Liens entre les canapés de la page d'accueil et la page Produit*/ 

//Création de la variable idProduct qui représente chaque canapé
//Recupération des paramètres URL avec la propriété window.location.href
// Utilisation d'URLSearchParams.get (pour passer l’id d’une page à une autre)
let idProduct = new URL(window.location.href).searchParams.get('id');
/*console.log(idProduct)*/


//Requête de l'API avec fetch
fetch('http://localhost:3000/api/products/' + idProduct)
.then((response) => response.json())
.then((data) => {
/*console.log(data)*/

/* Etape 6 :  Insérer un produit et ses détails dans la page Produit */

//Création des variables pour l'affichage
  function seeProduct(myProduct) {
    let productImg = document.createElement("img");
    let productName = document.getElementsByTagName("title");
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let description = document.querySelector('#description');
    let colors = document.querySelector('#colors');

    //Affichage du produit
    document.querySelector(".item__img").appendChild(productImg);
    productImg.setAttribute("src", `${myProduct.imageUrl}`);
    productImg.setAttribute("alt", `${myProduct.altTxt}`);

    productName[0].textContent = myProduct.name;
    title.textContent = myProduct.name;
    price.textContent = myProduct.price;
    description.textContent = myProduct.description;

    //Affichage des couleurs par Sélection avec une boucle for in 
    for (let i in myProduct.colors) {
      colors.insertAdjacentHTML('beforeend', `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`);
    };

  }
seeProduct(data); 

}) // Fermeture de fetch
//Ouverture d'une fenêtre de message en cas d'erreur
.catch(function (error) {
    alert('Le serveur ne répond pas, si le problème persiste, contactez : support@name.com');
  });
 
/* Etape 7 : Ajouter des produits dans le panier */

  // Créer un produit
  let createProduct = () => {
      let quantity = document.querySelector('#quantity');

  //Récupérer le produit et le Mettre dans le local storage
  let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

    let optionProduct = {
      _id: idProduct,
      quantity: quantity.value,
      colors: colors.value,
    };

   /* Gestion des alertes ou erreurs au clients par affichage de message:
   lorsque qu'il clic sur le bouton ajouter */
   var alert = document.querySelector('.item__content__addButton');

   var errorAlert = () => {

  //Disparation de l'alerte après son affichage avec setTimeout
  var endAlert = () => {
    var endAlert = document.querySelector('#alert');
    setTimeout(function () {
      endAlert.remove();
    }, 2000);
  };  

    //Confirmation d'ajout au panier
    var addProductAlert = () => {
    alert.insertAdjacentHTML(
    'afterend',
          `<span id ='alert' style='text-align: center; font-weight: bold; color: #3d4c68'>
          <br>Article(s) bien ajouté(s) au panier, merci !</span>`
          );
    endAlert();
    }

  
//Prévenir le client qu'il ne peut pas commander plus de 100 fois le même produit
	var maxLimitAlert = () => {
		alert.insertAdjacentHTML(
			'afterend',
            `<span id ='alert' style='text-align: center; font-weight: bold; color: #3d4c68'>
            <br>Pour toutes commandes de plus de 100 articles identiques, merci de directement nous contacter</span>`
            );
		endAlert();
	}

   //Alerte pour les quantités : non sélectonnées OU supérieur à 100
   if (optionProduct.quantity <= 0 || optionProduct.quantity >= 101) {
     alert.insertAdjacentHTML ( 'afterend', 
     `<span id = 'alert' style='text-align: center; font-weight: bolder; color: #3d4c68'>
     <br>Veuillez choisir une quantité strictement comprise entre 1 et 100</span>`);
     endAlert();
   }

} // Fermeture de l'accolade var errorAlert ligne70

   
  // Ajout (Stockage) du produit dans le local storage avec setItem
  let addProductInLocalStorage = () => {
     productInLocalStorage.push(optionProduct);
     localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    addProductAlert();
  }
  
  // Modifie un produit sélectionné dans le local storage
  let modifyProductInLocalStorage = (i) => {
    productInLocalStorage[i].quantity = parseInt(productInLocalStorage[i].quantity);
    optionProduct.quantity = parseInt(optionProduct.quantity);
  
        // Prévient et Empeche qu'un produit soit ajouté plus de 100 fois
        let beforeMoreAfterAddProductInLocalStorage = optionProduct.quantity + productInLocalStorage[i].quantity;

        if (beforeMoreAfterAddProductInLocalStorage >= 101) {
        maxLimitAlert();
        //Sinon Ajouter un produit dans le locale storage
        } else {
        productInLocalStorage[i].quantity += optionProduct.quantity;
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        addProductAlert();
        };
  }; // Fermeture let modifyProductInLocalStorage ligne120

  }; // Accolade de fin de la ligne 54 (let createProduct) 
