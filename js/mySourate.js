const audio = document.getElementById("audio-sourate");

// Récupération de tous les éléments contenant l'audio
const audioElements = document.querySelectorAll('[id^="audio-sourate-"]');
let currentAudio = null;

// Boucle pour ajouter l'événement de clic à chaque bouton de lecture
audioElements.forEach(audioElement => {
    const playBtn = audioElement.parentElement.querySelector('#play-btn');
    const playBtnContent = playBtn.innerHTML;

    playBtn.addEventListener('click', function () {
        // Pause de l'audio en cours
        if (currentAudio && currentAudio !== audioElement) {
            currentAudio.currentTime = 0;
            currentAudio.pause();
            const currentPlayBtn = currentAudio.parentElement.querySelector('#play-btn');
            currentPlayBtn.innerHTML = '<lord-icon src="https://cdn.lordicon.com/xddtsyvc.json" trigger="morph" colors="primary:#6c16c7" state="morph-play-pause" style="width:20px;height:20px"></lord-icon>';
        }
        // Lecture / Pause du mp3
        if (audioElement.paused) {
            audioElement.play();
            playBtn.innerHTML = '<lord-icon src="https://cdn.lordicon.com/ensnyqet.json" trigger="morph"colors="primary:#6c16c7" style="width:20px;height:20px"></lord-icon>';
            currentAudio = audioElement;
        } else {
            audioElement.pause();
            playBtn.innerHTML = '<lord-icon src="https://cdn.lordicon.com/xddtsyvc.json" trigger="morph" colors="primary:#6c16c7" state="morph-play-pause" style="width:20px;height:20px"></lord-icon>';
            currentAudio = null;
        }
    });

    audioElement.addEventListener('ended', function () {
        playBtn.innerHTML = playBtnContent;
    });
});

// Récupération de la liste des sourates
const sourateList = document.getElementById('sourate-list');
// Récupération de la card de la sourate en cours
const currentSourateCard = document.getElementById('sourate');
// Récupération de l'élément pour afficher l'état courant
const currentState = document.getElementById('currentState');
// Récupération de l'élément pour afficher le titre de la sourate en cours
const currentSourate = document.getElementById('currentSourate');

// Vérifie s'il y a déjà une sourate en cours enregistrée en localStorage
if (localStorage.getItem('currentSourate')) {
    currentSourate.textContent = localStorage.getItem('currentSourate');
    currentSourateCard.href = localStorage.getItem('currentSourateHref');
    currentState.textContent = 'Sourate en cours';
}

// Parcours la liste des sourates pour ajouter un listener sur chaque lien
sourateList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {

        // Récupère le titre et le lien de la sourate cliquée
        const sourateTitle = link.textContent;
        const sourateHref = link.href;

        // Met à jour les éléments de la card de la sourate en cours
        currentSourate.textContent = sourateTitle;
        currentSourateCard.href = sourateHref;
        currentState.textContent = 'Sourate en cours';

        // Enregistre les informations de la sourate en cours en localStorage
        localStorage.setItem('currentSourate', sourateTitle);
        localStorage.setItem('currentSourateHref', sourateHref);
    });
});

// Récupération du bouton de validation
const validateButton = document.getElementById('buttonValidate');

// Gestionnaire d'événement pour le clic sur le bouton de validation
validateButton.addEventListener('click', function() {
  // Récupération de la modal de validation
  const validationModal = document.getElementById('validationModal');

  // Récupération de la modal d'annulation
  const cancelModal = document.getElementById('cancelModal');
  
  // Récupération du compteur
  let counter = parseInt(localStorage.getItem('counter')) || 0;
  
  // Récupération de l'élément de compteur
  const counterElement = document.getElementById('counter');
  
  // Affichage de la modal de validation
  validationModal.style.display = 'block';
  
  // Disparition de la modal après 5 secondes
  setTimeout(function() {
    validationModal.style.display = 'none';
  }, 5000);
  
  // Incrémentation du compteur
  counter++;
  counterElement.textContent = counter;
  
  // Stockage du compteur en local
  localStorage.setItem('counter', counter);
  
  // Remplacement du bouton de validation par le bouton d'annulation
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Annuler l\'apprentissage';
  cancelButton.classList.add('button');
  validateButton.replaceWith(cancelButton);
  
  // Gestionnaire d'événement pour le clic sur le bouton d'annulation
  cancelButton.addEventListener('click', function() {
    // Affichage de la modal d'annulation
    cancelModal.style.display = 'block';
    
    // Disparition de la modal après 5 secondes
    setTimeout(function() {
      cancelModal.style.display = 'none';
    }, 5000);
    
    // Décrémentation du compteur
    counter--;
    counterElement.textContent = counter;
    
    // Stockage du compteur en local
    localStorage.setItem('counter', counter);
    
    // Remplacement du bouton d'annulation par le bouton de validation
    cancelButton.replaceWith(validateButton);
  });
});


