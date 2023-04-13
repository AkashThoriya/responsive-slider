(function() {
    const slider = document.getElementById('slider');
    const slides = slider.children;

    let slideIndex = 0;
    let slideWidth = 0;
    let slidesToShow = 3;

    // Calculate the width of each slide based on the viewport width
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

    // Clone the first 'slidesToShow' slides and append them to the slider
    function cloneSlides() {
        for (let i = 0; i < slidesToShow; i++) {
            let clone = slides[i % slides.length].cloneNode(true);
            slider.appendChild(clone);
        }
    }

    // Update the slide index based on the increment value
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

    // Move the slider to the next slide
    function nextSlide() {
        updateSlideIndex(1);
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    // Auto-play the slider by moving to the next slide every 5 seconds
    function autoPlay() {
        setInterval(nextSlide, 5000);
    }

    // Update the slider position and slide width when the window is resized
    function onResize() {
        calculateSlideWidth();
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    // Add event listeners and initialize the slider
    window.addEventListener('resize', onResize);
    calculateSlideWidth();
    cloneSlides();
    autoPlay();
})();
