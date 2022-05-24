//*Etape 3 : Insérer les produits dans la page d’accueil
//Création d'une fonction pour insérer les produits
function displayProducts(dataProduct) {
  if (dataProduct) {
    for (let i = 0; i < dataProduct.length; i += 1) {
      //Déclaration des variables + affectation + création des éléments (L54 HTML)
      let product = document.createElement('article');
      let link = document.createElement('a');
      let image = document.createElement('img');
      let title = document.createElement('h3');
      let description = document.createElement('p');

      document.getElementById('items').appendChild(link);
      // Lien vers le produit et Étape 5 : Récupérer l’id du produit à afficher
      // Rappel : Dans le back/routes/product.js : ligne7 : router.get('/:id', productCtrl.getOneProduct);
      link.href = './product.html?id=' + dataProduct[i]._id;

      // Création de l'enfant Product qui a pour parent Link (a)
      link.appendChild(product);

      //Ajout des éléments (enfants) : Image, Title et Description qui ont pour parent: Product (article)
      product.appendChild(image);
      image.src = dataProduct[i].imageUrl;
      image.alt = dataProduct[i].altTxt;

      product.appendChild(title);
      title.classList.add('title');
      title.textContent = dataProduct[i].name;

      product.appendChild(description);
      description.classList.add('description');
      description.textContent = dataProduct[i].description;
    }
  }
}

function fetchAllProducts() {
  fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => displayProducts(data))
    .catch(function (error) {
      console.log(error);
    });
}

fetchAllProducts();

//Me permet d'Afficher un compteur pour le panier sur la page d'acueil
function numberProductsInCart() {
  let cart = document
    .getElementsByTagName('nav')[0]
    .getElementsByTagName('li')[1];
  let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
  let numberProducts = 0;

  for (let q in productInLocalStorage) {
    let quantityProductsInLocalStorage = parseInt(
      productInLocalStorage[q].quantity
    );
    numberProducts += quantityProductsInLocalStorage;
  }

  cart.innerHTML = `Panier  <span id='numberProductsInCart' style='color: '#3d4c68;'>( ${numberProducts} )</span>`;
}
numberProductsInCart();
