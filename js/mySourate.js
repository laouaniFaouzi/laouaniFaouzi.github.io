let menuButton = $("#menuButton");
let menuSourate = $("#menuSourate");
let menuCloseButton = $("#menuCloseButton");

menuButton.on("click", function () {
    menuSourate.addClass("open");
})
menuCloseButton.on("click", function () {
    menuSourate.removeClass("open");
})

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

// Récupération de la valeur de progression dans le stockage local
var progression = localStorage.getItem('progression');

// Affichage de la valeur de progression dans la balise div avec l'ID "progression"
document.getElementById('progression').textContent = progression;


// Vérification de la présence de localStorage
if (typeof (Storage) !== "undefined") {
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
    sourateList.querySelectorAll('.sourate-link').forEach(link => {
        link.addEventListener('click', (event) => {

            // Récupère le titre et le lien de la sourate cliquée
            const sourateTitle = link.textContent.replace(link.querySelector('span').textContent, '').trim();
            const sourateHref = event.target.href;

            // Met à jour les éléments de la card de la sourate en cours
            currentSourate.textContent = sourateTitle;
            currentSourateCard.href = sourateHref;
            currentState.textContent = 'Sourate en cours';

            // Enregistre les informations de la sourate en cours en localStorage
            localStorage.setItem('currentSourate', sourateTitle);
            localStorage.setItem('currentSourateHref', sourateHref);
        });
    });
} else {
    console.log("localStorage n'est pas supporté dans ce navigateur.");
}