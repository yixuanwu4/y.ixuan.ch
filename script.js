document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('scrolling-image');
    const container = document.getElementById('image-container');
    const textBox = document.getElementById('text-box'); // Get the text-box element
    const buttons = document.querySelectorAll('.action-button'); // Get both buttons
  
    if (!image || !container || !textBox || !buttons.length) {
        console.error('Image, container, text-box, or buttons not found!');
        return;
    }
  
    let maxScrollPosition = 0;
    let currentScrollPosition = 0;
  
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
        const oldPosition = currentScrollPosition;
        currentScrollPosition += delta;
        currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScrollPosition));
        image.style.transform = `translateX(-${currentScrollPosition}px)`;

        
    };
  
    const onImageLoadOrResize = () => {
        image.style.height = `${container.clientHeight}px`;
        image.style.width = 'auto'; // Maintain aspect ratio
  
        maxScrollPosition = updateMaxScrollPosition();
        centerImage();
  
        currentScrollPosition = Math.min(currentScrollPosition, maxScrollPosition);
        image.style.transform = `translateX(-${currentScrollPosition}px)`;

        // Add event listener to both buttons to delay for 1 second, then fade out text-box **
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {  // Delay the fade-out by 1 second 
                    textBox.style.transition = 'opacity 1.5s ease'; // Modified: Slower fade-out (1 second) 
                    textBox.style.opacity = '0'; // Set opacity to 0 to make it disappear 
                }, 600); // Wait for 1 second (1000ms) before starting fade-out 
            });
        });
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
});
