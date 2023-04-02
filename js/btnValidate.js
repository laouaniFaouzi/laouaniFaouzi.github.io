var sourceSourateElement = document.getElementById("sourateTitleText");
var sourceSourateText = sourceSourateElement.textContent;
var targetSourateText = document.getElementById("titleSourate");
console.log(sourceSourateText)
targetSourateText.textContent = sourceSourateText;

// récupération de l'élément contenant le compteur
let counterElement = $("#progression");

var buttonValidate = $('#buttonValidate');
var cancelButton = $('#buttonCancel');

// récupération de la popup
let popup = $(".popup");
let popupValidate = $(".popup-validate");
let popupCancelate = $(".popup-cancelate");

// récuperation du body
let body = $("body");

// récupération des boutons de la popup
let closeButton = popup.find("#closeButton");

// récupération de la valeur de progression depuis le stockage local
var progression = localStorage.getItem('progression') || 0;

// affichage de la valeur de progression dans l'élément span
counterElement.text(progression);

for (var i = 0; i < buttonValidate.length; i++) {
  // écouteur d'événements pour le bouton de validation
  buttonValidate.on("click", function() {
    // Incrémentation de la valeur de progression
    progression = parseInt(progression) + 1;
    // stockage du compteur en local storage
    localStorage.setItem('progression', progression);
    // affichage de la valeur de progression dans l'élément span
    counterElement.text(progression);
    // affichage de la popup
    popupValidate.removeAttr("hidden");
    // ajouter display flex à la box
    popupValidate.addClass("d-flex");
    // bloque le scroll de la page
    body.addClass("no-scroll");

    buttonValidate.toggleClass('hidden');
    cancelButton.toggleClass('hidden');
  });
}

for (var i = 0; i < cancelButton.length; i++) {
  // écouteur d'événements pour le bouton d'annulation
  cancelButton.on("click", function() {
    var progression = localStorage.getItem('progression');
    // Décrémentation de la valeur de progression
    progression = parseInt(progression) - 1;
    // stockage du compteur en local storage
    localStorage.setItem('progression', progression);
    // affichage de la valeur de progression dans l'élément span
    counterElement.text(progression);
    // affichage de la popup
    popupCancelate.removeAttr("hidden");
    // ajouter display flex à la box
    popupCancelate.addClass("d-flex");
    // bloque le scroll de la page
    body.addClass("no-scroll");

    cancelButton.toggleClass('hidden');
    buttonValidate.toggleClass('hidden');
  });
}

// écouteur d'événements pour le bouton de fermeture de la popup
closeButton.on("click", function() {
  // masquage de la popup
  popup.attr("hidden", "");
  // débloque le scroll de la page
  body.removeClass("no-scroll");
    // supprimer display flex à la box
    popup.removeClass("d-flex");
});
