//Etape 4 : faire le lien entre un produit de la page d'accueil et la page produit
//Utiliser searchParams:
const idProduct = new URL(window.location.href).searchParams.get('id');

//Etape 6: Insérer un produit et ses détails dans la page produit
//Création d'une fonction displayProduct pour afficher le produit sur la page
function displayProduct(myProduct) {
  const productImg = document.createElement('img');
  const title = document.querySelector('#title');
  const price = document.querySelector('#price');
  const description = document.querySelector('#description');
  const colors = document.querySelector('#colors');

  //Affichage du produit
  document.querySelector('.item__img').appendChild(productImg);
  productImg.setAttribute('src', `${myProduct.imageUrl}`);
  productImg.setAttribute('alt', `${myProduct.altTxt}`);

  title.textContent = myProduct.name;
  price.textContent = myProduct.price;
  description.textContent = myProduct.description;

  //Affichage des couleurs par Sélection avec une boucle for in
  for (let i in myProduct.colors) {
    colors.insertAdjacentHTML('beforeend', `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`);
  }
}

function fetchOneProduct() {
  //Requête de l'API avec fetch
  fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((data) => displayProduct(data))
    .catch(function (error) {
      console.log(error);
    });
}
fetchOneProduct();

// Étape 7 : Ajouter des produits dans le panier
// Fonction sauvegarder le panier qui récupère le panier et l'envoie dans le localStorage
function saveBasket(basket) {
  localStorage.setItem('product', JSON.stringify(basket));
}

// Fonction pour récupèrer le panier dans le localStorage. Si il est vide, on retourne un array, si il y a des éléments, on retourne le panier
function getBasket() {
  let basket = localStorage.getItem('product');
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// Fonction pour ajouter un produit au panier
function addBasket(product) {
  // On met le contenu du panier dans la variable basket
  let basket = getBasket();
  // On regarde si le produit ajouté au panier existe dans la même couleur ou pas
  let foundProduct = basket.find((element) => element.id == product.id && element.color == product.color);
  // Si oui, on met à jour la quantité
  if (foundProduct != undefined) {
    let newQuantity =
      parseInt(foundProduct.quantity) + parseInt(product.quantity);
    foundProduct.quantity = newQuantity;
    location.reload();
    window.confirm(`Votre panier a été mis à jour de ${quantity} ${title.textContent} ${color}`);
  }
  // Si non, on ajoute le produit au panier
  else {
    product.quantity = quantity;
    basket.push(product); // on ajoute notre product à la fin de notre basket
    location.reload();
    window.confirm(`Votre commande de ${quantity} ${title.textContent} ${color} est ajoutée au panier`);
  }
  saveBasket(basket); // sauvegarde
}

// Ce que l'on veut dans notre tableau grace au clic de "ajouter au panier":
function addToCart() {
  // On récupère la quantité choisie par l'utilisateur
  document.getElementById('quantity').addEventListener('change', (event) => {
    quantity = event.target.value;
  });

  // On récupère la couleur choisie par l'utilisateur
  document.getElementById('colors').addEventListener('change', (event) => {
    color = event.target.value;
  });

  // On écoute le clic du bouton addToCart
  document.getElementById('addToCart').addEventListener('click', (result) => {
    // on vérifie que la couleur est choisie et que la quantité est comprise entre 0 et 100
    if (color != '' && quantity <= 100 && quantity != 0) {
      const product = {
        id: idProduct,
        color: color,
        quantity: quantity,
      };
      getBasket();
      addBasket(product);
    }
    // Si l'utilisateur n'a pas choisi de couleur, on lui indique de le faire
    else {
      window.confirm('Veuillez sélectionner une couleur et une quantité comprise entre 1 et 100');
    }
  });
}
addToCart();
