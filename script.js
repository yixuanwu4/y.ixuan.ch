document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('scrolling-image');
    const container = document.getElementById('image-container');
  
    if (!image || !container) {
        console.error('Image or container element not found!');
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
