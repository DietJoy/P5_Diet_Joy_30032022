/* Etape 4 : Création du Lien entre les canapés de la page d'accueil et la page Produit*/ 

//Requête de l'API avec fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {
  console.log(data)

//Création de la variable idProduct qui représente chaque canapé
//Recupération des paramètres URL avec la propriété window.location.href
// Utilisation d'URLSearchParams.get (pour passer l’id d’une page à une autre)
let idProduct = new URL(window.location.href).searchParams.get('id');


/* Etape 5 : Récuperer l'id du produit à afficher*/
 let findProduct = () => {
     return data.find((product) => product._id === idProduct);
  };

  let myProduct = findProduct();

/* Etape 6 :  Insérer un produit et ses détails dans la page Produit */

//Création des variables pour l'affichage
let seeProduct = () => {
  let productImg = document.createElement("img");
  let productName = document.getElementsByName("title");
  let title = document.querySelector('#title');
  let price = document.querySelector('#price');
  let description = document.querySelector('#description');
  let colors = document.querySelector('#colors');

//Affichage du produit
document.querySelector(".item__img").appendChild(productImg);
productImg.setAttribute("src", `${myProduct.imageUrl}`);
productImg.setAttribute("alt", `${myProduct.altTxt}`);

productName[0].textContent = myProduct.name
title.textContent = myProduct.name
price.textContent = myProduct.price
description.textContent = myProduct.description

//Affichage des couleurs par Sélection avec une boucle for in 
for (let i in myProduct.colors) {
  colors.insertAdjacentHTML( 'beforeend', `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`);
};

};
seeProduct(); 

}) // Fermeture de fetch
//Ouverture d'une fenêtre de message en cas d'erreur
.catch(function (error) {
    alert('Le serveur ne répond pas, si le problème persiste, contactez : support@name.com');
  });
 
