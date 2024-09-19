// loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form1').classList.add('load');
    document.getElementById('anim_text_1').classList.add('load');
    document.getElementById('anim_text_2').classList.add('load');
});

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


// Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('#slider-id');
    const items = slider.querySelectorAll('.item');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentIndex = 0;
    const extraMargin = 3.5 * 16; // Convert 3.5rem to pixels (assuming 1rem = 16px)
    const autoPlayDelay = 5000; // Delay in milliseconds

    const updateSlider = () => {
        const itemWidth = items[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(slider).gap) || 0; // Get the gap between items
        let totalWidth = currentIndex * (itemWidth + gap);

        // Add extra margin only if the last item is visible
        if (currentIndex === items.length - 3) {
            totalWidth += extraMargin;
        }

        slider.style.transform = `translateX(${-totalWidth}px)`;
    };

    const goToNextSlide = () => {
        if (currentIndex < items.length - 3) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        updateSlider();
    };

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 3; // Loop back to the end
        }
        updateSlider();
    };

    // Event listeners for manual navigation
    nextButton.addEventListener('click', () => {
        goToNextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        goToPrevSlide();
        resetAutoPlay();
    });

    // Auto-play functionality with continuous looping
    let autoPlayInterval = setInterval(goToNextSlide, autoPlayDelay);

    // Reset auto-play interval
    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(goToNextSlide, autoPlayDelay);
    };

    // Recalculate item width on window resize
    window.addEventListener('resize', updateSlider);

    // Initial update
    updateSlider();
});

// congrats animation
document.addEventListener('DOMContentLoaded', function() {
    function initParticles() {
        confetti();
    }

    function confetti() {
        const confettiElements = document.querySelectorAll(".confetti");
        
        confettiElements.forEach(function(confettiElement) {
            const confettiCount = (confettiElement.offsetWidth / 50) * 10;
            for (let i = 0; i <= confettiCount; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle', 'c' + rnd(1, 2));

                particle.style.top = rnd(10, 50) + '%';
                particle.style.left = rnd(0, 100) + '%';
                particle.style.width = rnd(6, 8) + 'px';
                particle.style.height = rnd(3, 4) + 'px';
                particle.style.animationDelay = (rnd(0, 30) / 10) + 's';
                
                confettiElement.appendChild(particle);
            }
        });
    }

    function rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initParticles();
});

// Menu button
var menuButton = document.getElementById('menuButton');

var navbarMenu = document.querySelector('.navbar_menu.is-page-height-tablet');

menuButton.addEventListener('click', function() {
    navbarMenu.classList.toggle('open');
});