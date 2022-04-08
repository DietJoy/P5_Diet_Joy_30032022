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

// coder que idProduct doit être egal à son id 





}) // Fermeture de fetch
//Ouverture d'une fenêtre de message en cas d'erreur
.catch(function (error) {
    alert('Le serveur ne répond pas, si le problème persiste, contactez : support@name.com');
  });
 
