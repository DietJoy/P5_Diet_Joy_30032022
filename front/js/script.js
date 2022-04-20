/* Etape 3 */

//Requête de l'API avec fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {
    

//Affichage des produits avec une boucle for
for (let i = 0; i < data.length; i += 1) {
    //Déclaration des variables + affectation + création des éléments (L54 HTML)
    let product = document.createElement('article');
    let link = document.createElement('a');
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');

    document.getElementById('items').appendChild(link); 
        // Lien vers le produit et Étape 5 : Récupérer l’id du produit à afficher 
        // Rappel : Dans le back/routes/product.js : ligne7 : router.get('/:id', productCtrl.getOneProduct);
        link.href = './product.html?id=' + data[i]._id;
        

     // Création de l'enfant Product qui a pour parent Link (a)   
    link.appendChild(product);

    //Ajout des éléments (enfants) : Image, Title et Description qui ont pour parent: Product (article)
    product.appendChild(image);
    image.src = data[i].imageUrl;
    image.alt = data[i].altTxt;
    
        product.appendChild(title);
        title.classList.add('title');
        title.textContent = data[i].name;
    
    product.appendChild(description);
    description.classList.add('description');
    description.textContent = data[i].description;   
}    
    
})
//Ouverture d'une fenêtre de message en cas d'erreur
.catch(function (error) {
    alert('Le serveur ne répond pas, si le problème persiste, contactez : support@name.com');
     console.log(error)
  });

//Indique la quantité de produit dans le panier
let numberProductsInCart = () => {
	let cart = document.getElementsByTagName('nav')[0].getElementsByTagName('li')[1];
	let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
	let numberProducts = 0;

	for (let q in productInLocalStorage) {
		let quantityProductsInLocalStorage = parseInt(productInLocalStorage[q].quantity);
		numberProducts += quantityProductsInLocalStorage
	};

	cart.innerHTML = `Panier  <span id='numberProductsInCart' style='color: '#3d4c68;'>( ${numberProducts} )</span>`;
};
numberProductsInCart();
 