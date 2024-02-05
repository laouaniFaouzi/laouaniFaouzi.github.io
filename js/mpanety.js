window.addEventListener('scroll', function () {
    let currentSectionId = '';
    document.querySelectorAll('section').forEach(function (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSectionId = section.id;
        }
    });

    // Mise en surbrillance du lien correspondant à la section visible
    document.querySelectorAll('nav ul li a').forEach(function (link) {
        link.classList.remove('highlight');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('highlight');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.offcanvas ul li a');
    const offcanvas = document.querySelector('.offcanvas');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            offcanvas.classList.remove('show');

            body.style.overflow = '';
            body.style.padding = '';
            header.style.margin = '';
            header.style.padding = '';
        });
    });
});

window.onload = function() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const home = document.getElementById('home');
    const newHomeHeight = window.innerHeight - headerHeight;
    
    home.style.height = `${newHomeHeight}px`;
};

document.addEventListener('click', function (e) {
    // Vérifier si l'élément cliqué est une ancre
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault(); // Empêcher le comportement par défaut de l'ancre

        // Récupérer l'élément ciblé par l'ancre
        var targetElement = document.querySelector(e.target.getAttribute('href'));

        if (targetElement) {
            // Calculer la hauteur du header
            var headerHeight = document.querySelector('header').offsetHeight;

            // Faire défiler jusqu'à l'élément ciblé en prenant en compte la hauteur du header
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth' // Ajouter une animation de défilement
            });
        }
    }
});

// Fonction pour déterminer le jour actuel
function getDayOfWeek() {
    var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var today = new Date().getDay();
    return days[today];
}

// Fonction pour afficher l'onglet et le bouton du jour actuel
function showTodayTab() {
    var today = getDayOfWeek();
    var tab = document.getElementById(today);
    var button = document.querySelector('button[onclick="showTab(\'' + today + '\')"]');

    if (tab) {
        // Ajouter la classe "today" à l'onglet du jour actuel
        tab.classList.add('today');
    }

    if (button) {
        // Ajouter la classe "today" au bouton du jour actuel
        button.classList.add('today');
        button.classList.add('active');
    }
}

// Fonction pour afficher un onglet
function showTab(jour) {
    // Cacher tous les onglets
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    // Désélectionner tous les boutons
    var buttons = document.querySelectorAll('#tabs button');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    // Afficher l'onglet correspondant au jour
    var tab = document.getElementById(jour);
    if (tab) {
        tab.style.display = 'block';
    }

    // Sélectionner le bouton correspondant et ajouter la classe "active"
    var button = document.querySelector('button[onclick="showTab(\'' + jour + '\')"]');
    if (button) {
        button.classList.add('active');
        tab.classList.add('active')
    }
}

// Appeler la fonction pour afficher l'onglet et le bouton du jour actuel
showTodayTab();

// Désactiver les contrôles vidéo après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video1');
    if (video) {
        video.controls = false;
    }
});