
let idProduct = new URL(window.location.href).searchParams.get('id');

function displayProduct(myProduct) {
  let productImg = document.createElement('img');
  let productName = document.getElementsByTagName('title');
  let title = document.querySelector('#title');
  let price = document.querySelector('#price');
  let description = document.querySelector('#description');
  let colors = document.querySelector('#colors');

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

function addToCart(){
  window.onload=function(){
  const addCart = document.getElementById('addToCart');
  //au clic on lance la fonction addPanier
  addCart.addEventListener('click', saveProduct);
}
}
//Récupérer le produit en cours sur la page produit
//Sauvegarder dans le local storage avec set item
//Avant une sauvegarde de produit vérifier qu'il n'existe pas déjà dans le locale storage avec la méthode find, 
function saveProduct (){
  console.log('TOTOTOTOTO')
}
addToCart();

