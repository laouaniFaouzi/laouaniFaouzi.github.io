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


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('#slider-id');
    const items = slider.querySelectorAll('.item');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentIndex = 0;

    const updateSlider = () => {
        slider.style.transform = `translateX(${-currentIndex * items[0].offsetWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 3) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 3; // Loop back to the end
        }
        updateSlider();
    });

    // Auto-play functionality with continuous looping
    const autoPlayInterval = setInterval(() => {
        nextButton.click();
    }, 5000); // Change slide every 5 seconds
});
