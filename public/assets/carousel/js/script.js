let images = [];

let currentSlide = 0;

let slidesContainer = null;
let dotsContainer = null;
let dots = null;

let startX = 0;
let isDragging = false;

async function init() {
    images = await fetchFiles();
    slidesContainer = document.getElementById('slides');
    dotsContainer = document.getElementById('dots');

    createSlides();
    updateCarousel();
    initTouch();
}

function initTouch() {
    slidesContainer.addEventListener('touchstart', (e) => {
        console.log('touchstart');
        startX = e.touches[0].clientX;
        isDragging = true;
    }, {
        passive: true
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        console.log('touchmove');
        const moveX = e.touches[0].clientX;
        const diffX = startX - moveX;
    }, {
        passive: true
    });

    slidesContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        console.log('touchend');
        isDragging = false;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < images.length - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
        }

        updateCarousel();
    });
}

function createSlides() {
    images.forEach((img, index) => {
        console.log(img);
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url('../content/${img}')`;
        slidesContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    dots = document.querySelectorAll('.dot');
}

function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
    setContent(currentSlide+1);
}

function goToSlide(index) {
    console.log(index);
    currentSlide = index;
    updateCarousel();
}