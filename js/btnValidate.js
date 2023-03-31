// récupération de l'élément contenant le compteur
let counterElement = $("#counter");

// récupération du bouton de validation
let validateButton = $("#buttonValidate");

// récupération de la popup
let popup = $(".popup");

// récupération des boutons de la popup
let closeButton = popup.find("#closeButton");
let cancelButton = popup.find("#cancelButton");

// initialisation du compteur
let counter = localStorage.getItem("counter") || 0;
counterElement.text(counter);

// écouteur d'événements pour le bouton de validation
validateButton.on("click", function() {
  console.log("toto")
  // incrémentation du compteur
  counter++;
  // mise à jour de l'affichage du compteur
  counterElement.text(counter);
  // stockage du compteur en local storage
  localStorage.setItem("counter", counter);
  // affichage de la popup
  popup.removeAttr("hidden");
});

localStorage.setItem('counter', counter.toString());

// écouteur d'événements pour le bouton d'annulation
cancelButton.on("click", function() {
  // décrémentation du compteur
  counter--;
  // mise à jour de l'affichage du compteur
  counterElement.text(counter);
  // stockage du compteur en local storage
  localStorage.setItem("counter", counter);
  // affichage de la popup d'annulation
  popup.find(".popup-content").text("Annulation !");
  // affichage de la popup
  popup.removeAttr("hidden");

  localStorage.setItem('counter', counter.toString());
});

// écouteur d'événements pour le bouton de fermeture de la popup
closeButton.on("click", function() {
  // masquage de la popup
  popup.attr("hidden", "");
});
