//Etape 4 : faire le lien entre un produit de la page d'accueil et la page produit
//Utiliser serchParams:
const idProduct = new URL(window.location.href).searchParams.get('id');


//Etape 6: Insérer un produit et ses détails dans la page produit 
//Création d'une fonction displayProduct pour afficher le produit sur la page
function displayProduct(myProduct) {
  const productImg = document.createElement('img');
  const productName = document.getElementsByTagName('title');
  const title = document.querySelector('#title');
  const price = document.querySelector('#price');
  const description = document.querySelector('#description');
  const colors = document.querySelector('#colors');

  //Affichage du produit
  document.querySelector('.item__img').appendChild(productImg);
  productImg.setAttribute('src', `${myProduct.imageUrl}`);
  productImg.setAttribute('alt', `${myProduct.altTxt}`);

  productName[0].textContent = myProduct.name;
  title.textContent = myProduct.name;
  price.textContent = myProduct.price;
  description.textContent = myProduct.description;

  //Affichage des couleurs par Sélection avec une boucle for in
  for (let i in myProduct.colors) {
    colors.insertAdjacentHTML(
      'beforeend',
      `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`
    );
  }
}

function fetchOneProduct() {
  //Requête de l'API avec fetch
  fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((data) => displayProduct(data))
    .catch(function (error) { console.log(error) });
}

fetchOneProduct();

//Etape 7: Ajouter des produits dans le panier
//Récupérer le produit en cours sur la page produit

function addToCart() {
 window.onload=function(){
  const buttonHtml = document.getElementById('addToCart');
  //au clic on lance la fonction Ajouter au Panier
  buttonHtml.addEventListener ('click', function () {


//Conditions de commande pour le client :
// Sélectionner une couleur ET saisir une quantité supérieur à 0 et inférieur à 100

const colorsHtml = document.getElementById("colors");
let colorsSelect = colorsHtml.value;

const quantityHtml = document.getElementById("quantity");
let quantitySelect = quantityHtml.value;

//Gestion des alertes:
const newAlert = document.createElement("p")
newAlert.style.color = "#3d4c68";
document.querySelector(".item").replaceChild(newAlert, document.querySelector("article"));
/*Faire en sorte que l'alerte disparaisse apres affichage
const endNewAlert = () => {
  let endNewAlert = document.querySelector("#newAlert");
  setTimeout(function () {
      endNewAlert.remove();
  }, 2500);
};*/


if (colorsSelect == "" || quantitySelect <= 0 || quantitySelect > 100) {
  newAlert.innerText = "Pour ajouter votre article, veuillez selectionner une couleur proposée et une quantité comprise entre 1 et 100, merci";
  /* endNewAlert(); */
  
  //Si la selection du client est conforme :
  } else {
    // objet : sélection du client
    let productSelect = {
      color: colorsSelect,
      quantity: Number(quantitySelect),
      id: idProduct,
    };

/*Sauvegarder dans le local storage avec set item,
Avant une sauvegarde de produit vérifier qu'il n'existe pas déjà dans le locale storage avec la méthode find*/ 
    
  }
});
}
}


function saveProduct (){
  console.log('TOTOTOTOTO')
}
addToCart();

