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
        console.log(`Image width: ${imageWidth}, Container width: ${containerWidth}, Max scroll: ${maxScrollPosition}`);
        return maxScrollPosition;
    };
  
    const centerImage = () => {
        const imageWidth = image.offsetWidth;
        const containerWidth = container.clientWidth;
        if (imageWidth > containerWidth) {
            currentScrollPosition = (imageWidth - containerWidth) / 2;
            image.style.transform = `translateX(-${currentScrollPosition}px)`;
        } else {
            currentScrollPosition = 0;
            image.style.transform = 'translateX(0)';
        }
        console.log(`Image centered. Current position: ${currentScrollPosition}`);
    };
  
    const updateImagePosition = (delta) => {
        const oldPosition = currentScrollPosition;
        currentScrollPosition += delta;
        currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScrollPosition));
        image.style.transform = `translateX(-${currentScrollPosition}px)`;
        console.log(`
            Delta: ${delta}
            Old position: ${oldPosition}
            New position: ${currentScrollPosition}
            Max scroll: ${maxScrollPosition}
        `);
    };
  
    const onImageLoadOrResize = () => {
        const containerHeight = container.clientHeight;
        image.style.height = `${containerHeight}px`;
        image.style.width = 'auto'; // Maintain aspect ratio
  
        maxScrollPosition = updateMaxScrollPosition();
        centerImage();
  
        currentScrollPosition = Math.min(currentScrollPosition, maxScrollPosition);
        image.style.transform = `translateX(-${currentScrollPosition}px)`;
  
        console.log(`Image loaded/resized. Current position: ${currentScrollPosition}`);
    }; 
  
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        console.log(`Wheel event detected. Delta Y: ${event.deltaY}`);
        updateImagePosition(event.deltaY);
    }, { passive: false });
  
    window.addEventListener('resize', onImageLoadOrResize);
  
    if (image.complete && image.naturalWidth) {
        onImageLoadOrResize();
    } else {
        image.addEventListener('load', onImageLoadOrResize);
    }
   
    console.log(`Image width set to: ${image.style.width}`);
  });
  