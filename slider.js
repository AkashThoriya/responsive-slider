(function() {
    const slider = document.getElementById('slider');
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
            let clone = slides[i % slides.length].cloneNode(true);
            slider.appendChild(clone);
        }
    }

    function updateSlideIndex(increment) {
        slideIndex += increment * slidesToShow;
        if (slideIndex >= slides.length - slidesToShow) {
            slideIndex = 0;
            slider.style.transition = "none";
            slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            setTimeout(() => {
                slider.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }, 50);
        }
    }

    function nextSlide() {
        updateSlideIndex(1);
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    function autoPlay() {
        setInterval(nextSlide, 2000);
    }

    function onResize() {
        calculateSlideWidth();
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    window.addEventListener('resize', onResize);
    calculateSlideWidth();
    cloneSlides();
    autoPlay();
})();
