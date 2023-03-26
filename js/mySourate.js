const audio = document.getElementById("audio-sourate");
const durationEl = document.getElementById("duration");
const trackerEl = document.getElementById("tracker");

// Récupération de tous les éléments contenant l'audio
const audioElements = document.querySelectorAll('[id^="audio-sourate-"]');
let currentAudio = null;

// Boucle pour ajouter l'événement de clic à chaque bouton de lecture
audioElements.forEach(audioElement => {
    const playBtn = audioElement.parentElement.querySelector('button');

    playBtn.addEventListener('click', function () {
        // Pause de l'audio en cours
        if (currentAudio && currentAudio !== audioElement) {
            currentAudio.currentTime = 0;
            currentAudio.pause();
            const currentPlayBtn = currentAudio.parentElement.querySelector('button');
            currentPlayBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
        }
        // Lecture / Pause du mp3
        if (audioElement.paused) {
            audioElement.play();
            playBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
            currentAudio = audioElement;
        } else {
            audioElement.pause();
            playBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
            currentAudio = null;
        }
    });
});


// Mettre la durée totale du mp3 dans l'élément de durée
audio.addEventListener("loadedmetadata", () => {
    const duration = formatTime(audio.duration);
    durationEl.textContent = duration;
});

// Mettre à jour la position du tracker en fonction de la progression de la lecture
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    trackerEl.style.width = `${progress}%`;
});

// Formatage du temps en minutes et secondes
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
}