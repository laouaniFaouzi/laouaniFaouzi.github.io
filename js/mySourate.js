const audio = document.getElementById("audio-sourate");
const durationEl = document.getElementById("duration");
const trackerEl = document.getElementById("tracker");

// Récupération de tous les éléments contenant l'audio
const audioElements = document.querySelectorAll('[id^="audio-sourate-"]');
let currentAudio = null;

// Boucle pour ajouter l'événement de clic à chaque bouton de lecture
audioElements.forEach(audioElement => {
    const playBtn = audioElement.parentElement.querySelector('button');
    const playBtnContent = playBtn.innerHTML;

    playBtn.addEventListener('click', function () {
        // Pause de l'audio en cours
        if (currentAudio && currentAudio !== audioElement) {
            currentAudio.currentTime = 0;
            currentAudio.pause();
            const currentPlayBtn = currentAudio.parentElement.querySelector('button');
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
