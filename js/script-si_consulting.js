// nav smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const navbarHeight = document.querySelector('.navbar_component').offsetHeight;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Reveal animation
let lastScrollTop = 0;

window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const blocs = document.querySelectorAll('.reveal-animation');
    const windowHeight = window.innerHeight;
    const isScrolledDown = window.scrollY > lastScrollTop;

    if (isScrolledDown) {
        blocs.forEach((bloc, index) => {
            const blocTop = bloc.getBoundingClientRect().top;

            if (blocTop < windowHeight / 1.7) {
                bloc.classList.add('reveal');
            }
        });
    }

    lastScrollTop = window.scrollY;
}

// Number animation
document.addEventListener('DOMContentLoaded', function() {
    function animateNumber(element, targetNumber, duration) {
        let startNumber = 0;
        const decimalPlaces = parseInt(element.dataset.decimals, 10) || 0; // Nombre de décimales à afficher
        const targetNumberFloat = parseFloat(targetNumber); // Assure-toi que la cible est un float
        const startNumberFloat = parseFloat(element.textContent); // Assure-toi que le nombre initial est float
        const increment = (targetNumberFloat - startNumberFloat) / (duration / 50); // Calcul de l'incrément avec la précision nécessaire

        const interval = setInterval(function() {
            startNumber += increment;
            if (startNumber >= targetNumberFloat) {
                startNumber = targetNumberFloat;
                clearInterval(interval);
            }
            element.textContent = (Math.round(startNumber * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces); // Afficher avec décimales
        }, 50);
    }

    const chiffreElements = document.querySelectorAll('.chiffre_animation');
    chiffreElements.forEach(element => {
        const targetNumber = parseFloat(element.textContent); // Assure-toi que la cible est un float
        element.textContent = '0'; // On commence à 0
        animateNumber(element, targetNumber, 2000); // 2000ms = 2 secondes, ajuste si nécessaire
    });
});
