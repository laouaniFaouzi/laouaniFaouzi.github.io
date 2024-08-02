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
