// Wrap the code in an Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace.
(function() {
    // Get a reference to the slider element from the DOM using its ID.
    const slider = document.getElementById('slider');
    // Get the child elements of the slider, which represent the slides.
    const slides = slider.children;

    // Initialize variables for the current slide index, slide width, and number of slides to show.
    let slideIndex = 0;
    let slideWidth = 0;
    let slidesToShow = 3;

    // Define a function to calculate the width of each slide based on the viewport width.
    const calculateSlideWidth = () => {
        // Determine how many slides should be visible based on the current viewport width.
        if (window.innerWidth <= 767) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        // Calculate the width of each slide as a percentage based on the number of visible slides.
        slideWidth = 100 / slidesToShow;
    };

    // Define a function to clone the first 'slidesToShow' slides and append them to the slider.
    // This is done to create an infinite loop effect when the slider reaches the end.
    function cloneSlides() {
        for (let i = 0; i < slidesToShow; i++) {
            // Clone the current slide and append it to the slider.
            let clone = slides[i % slides.length].cloneNode(true);
            slider.appendChild(clone);
        }
    }

    // Define a function to update the slide index based on the increment value.
    function updateSlideIndex(increment) {
        // Update the current slide index by adding the increment multiplied by the number of visible slides.
        slideIndex += increment * slidesToShow;
        // Check if the slide index is out of bounds, meaning that the slider has reached the end.
        if (slideIndex >= slides.length - slidesToShow) {
            // Reset the slide index to 0 and update the slider position without a transition.
            slideIndex = 0;
            slider.style.transition = "none";
            slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
            // Restore the transition after a brief delay to ensure that the reset is not visible.
            setTimeout(() => {
                slider.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }, 50);
        }
    }

    // Define a function to move the slider to the next slide.
    function nextSlide() {
        // Update the slide index and slider position.
        updateSlideIndex(1);
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    // Define a function to auto-play the slider by moving to the next slide every 5 seconds.
    function autoPlay() {
        setInterval(nextSlide, 5000);
    }

    // Define a function to update the slider position and slide width when the window is resized.
    function onResize() {
        // Recalculate the slide width based on the new viewport width and update the slider position.
        calculateSlideWidth();
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    // Add an event listener to handle the window resize event and adjust the slider accordingly.
    window.addEventListener('resize', onResize);
    // Calculate the initial slide width based on the viewport width.
    calculateSlideWidth();
    // Clone the first 'slidesToShow' slides to create an infinite loop effect.
    cloneSlides();
    // Start auto-playing the slider by moving to the next slide every 5 seconds.
    autoPlay();
})();   
