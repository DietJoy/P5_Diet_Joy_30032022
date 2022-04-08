/* Etape 3 */

//Requête de l'API avec fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {
console.log(data)

//Affichage des produits avec une boucle for
for (let i = 0; i < data.length; i += 1) {
    //Déclaration des variables + affectation + création des éléments (L54 HTML)
    let product = document.createElement('article');
    let link = document.createElement('a');
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');

    document.getElementById('items').appendChild(link); 
        // Lien vers le produit:
        link.href = './product.html?id=' + data.id;

     // Création de l'enfant Product qui a pour parent Link (a)   
    link.appendChild(product);

    //Création des enfants : Image, Title et Description qui ont pour parent: Product (article)
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
 