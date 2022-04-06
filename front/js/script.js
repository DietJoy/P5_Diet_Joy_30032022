//Requête de l'API avec fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

//Affichage des produits avec une boucle for
for (let i = 0; i < data.lenght; i += 1) {
    //Déclaration des variables + affectation
    let product = document.createElement('article');
    let link = document.createElement('a');
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');

    document.querrySelector('.items').appendChild(link);

        link.href = front/html/product.html?id=$:{data,[i]:_id};
        link.appendChild(product);

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
  });