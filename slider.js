// slider.js
(function () {
    const slider = document.getElementById("slider");
    const slides = slider.children;

    let slideIndex = 0;
    let slideWidth = 0;
    let slidesToShow = 3;

    const calculateSlideWidth = () => {
        if (window.innerWidth <= 767) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        slideWidth = 100 / slidesToShow;
    };

    function cloneSlides() {
        for (let i = 0; i < slidesToShow; i++) {
            let clone = slides[i].cloneNode(true);
            slider.appendChild(clone);
        }
    }

    function updateSlideIndex(increment) {
        slideIndex += increment * slidesToShow;
        if (slideIndex < 0) {
            slideIndex = slides.length - slidesToShow - 1;
            slider.style.transition = "none";
            slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease";
            }, 50);
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
            slider.style.transition = "none";
            slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease";
            }, 50);
        }
    }

    function nextSlide() {
        updateSlideIndex(1);
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    function previousSlide() {
        updateSlideIndex(-1);
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    function autoPlay() {
        setInterval(nextSlide, 3000);
    }

    function onResize() {
        calculateSlideWidth();
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    window.addEventListener("resize", onResize);
    calculateSlideWidth();
    cloneSlides();
    autoPlay();
})();
