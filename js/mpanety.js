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
            // Retire la classe 'show' de l'élément offcanvas
            offcanvas.classList.remove('show');

            body.style.overflow = '';
            body.style.padding = '';
            header.style.margin = '';
            header.style.padding = '';
        });
    });
});

window.onload = function() {
    // Calcul de la hauteur de l'écran moins la taille du header
    const headerHeight = document.querySelector('header').offsetHeight;
    const home = document.getElementById('home');
    const newHomeHeight = window.innerHeight - headerHeight;
    
    // Appliquer la nouvelle hauteur au contenu
    home.style.height = `${newHomeHeight}px`;
};