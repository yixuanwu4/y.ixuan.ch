document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('scrolling-image');
    const container = document.getElementById('image-container');
    const textBox = document.getElementById('text-box');
    const buttons = document.querySelectorAll('.action-button');
    const boat = document.getElementById('boat');
  
    if (!image || !container || !textBox || !buttons.length || !boat) { 
        console.error('Image, container, text-box, boat, or buttons not found!');
        return;
    }
  
    let maxScrollPosition = 0;
    let currentScrollPosition = 0;
    let boatHasMoved = false;
   
    const updateMaxScrollPosition = () => {
        const imageWidth = image.offsetWidth;
        const containerWidth = container.clientWidth;
        maxScrollPosition = Math.max(0, imageWidth - containerWidth);
        return maxScrollPosition;
    }; 
  
    const centerImage = () => {
        const imageWidth = image.offsetWidth;
        const containerWidth = container.clientWidth;
        if (imageWidth > containerWidth) {
            currentScrollPosition = 0;
            image.style.transform = `translateX(-${currentScrollPosition}px)`;
        } else {
            image.style.transform = 'translateX(0)';
        }
    };
  
    const updateImagePosition = (delta) => {
        currentScrollPosition += delta;
        currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScrollPosition));
        image.style.transform = `translateX(-${currentScrollPosition}px)`;
        
        // Keep the boat at the same X position, relative to the background image.
        const boatX = (container.clientWidth / 2) - (boat.offsetWidth / 2); // Boat stays centered
        boat.style.transform = `translate(${boatX}px, 568px)`;  // Boat's Y is fixed on the water level at 568px
    };
  
    const onImageLoadOrResize = () => {
        image.style.height = `${container.clientHeight}px`;
        image.style.width = 'auto'; // Maintain aspect ratio
  
        maxScrollPosition = updateMaxScrollPosition();
        centerImage();
  
        currentScrollPosition = Math.min(currentScrollPosition, maxScrollPosition);
        image.style.transform = `translateX(-${currentScrollPosition}px)`;
  
        // Add event listeners to buttons to fade out text-box and animate boat
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Fade-out text-box with delay
                setTimeout(() => {
                    textBox.style.transition = 'opacity 1.5s ease';
                    textBox.style.opacity = '0';
                }, 600); // Wait before starting fade-out
  
                // Animate the boat when any button is clicked
                if (!boatHasMoved) { // Ensure it only animates once
                    animateBoat();
                    boatHasMoved = true; // Flag to ensure the animation doesn't repeat
                }
            });
        });
    };
  
    // Set the initial position of the boat off-screen
    boat.style.transform = 'translate(-335.59px, 568px)'; // Starting position off-screen horizontally
    boat.style.opacity = '0'; // Start hidden

    const animateBoat = () => {
        boat.style.transition = 'transform 2s ease, opacity 0.5s ease'; // Animation duration and easing
        boat.style.opacity = '1'; // Make the boat visible
        boat.style.transform = 'translate(0px, 568px)'; // Final position on the water's surface
    };

    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        updateImagePosition(event.deltaY);
    }, { passive: false });
  
    window.addEventListener('resize', onImageLoadOrResize);
  
    if (image.complete && image.naturalWidth) {
        onImageLoadOrResize();
    } else {
        image.addEventListener('load', onImageLoadOrResize);
    }
    
    window.onload = function() {
        const textInput = document.getElementById('text-input');
        textInput.classList.add('visible'); // Trigger fade-in
    };
});
