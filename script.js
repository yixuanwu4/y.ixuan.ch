document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('scrolling-image');
  
    if (!image) {
      console.error('Image element not found!');
      return;
    }
  
    let maxScrollPosition = 0;
    let currentScrollPosition = 0;
  
    // Function to calculate the maximum scrollable position
    const updateMaxScrollPosition = () => {
      const imageWidth = image.naturalWidth || image.width;
      const windowWidth = window.innerWidth;
  
      // Calculate the maximum scrollable distance, ensuring it's a valid value
      const scrollPos = Math.max(0, imageWidth - windowWidth);
  
      console.log(`Image width: ${imageWidth}, Window width: ${windowWidth}`);
      console.log('Max scroll position calculated:', scrollPos);
  
      return scrollPos;
    };
  
    // Function to update the image position based on scroll
    const updateImagePosition = (delta) => {
      currentScrollPosition += delta;
  
      // Clamp currentScrollPosition between 0 and maxScrollPosition
      currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScrollPosition));
  
      // Set the new left position based on scroll
      image.style.left = `-${currentScrollPosition}px`;
      console.log('Image position updated to left:', currentScrollPosition);
    };
  
    // Function to handle image load and window resize
    const onImageLoadOrResize = () => {
      setTimeout(() => {
        // Recalculate max scroll position
        maxScrollPosition = updateMaxScrollPosition();
  
        // Ensure currentScrollPosition stays within bounds
        currentScrollPosition = Math.min(currentScrollPosition, maxScrollPosition);
  
        // Update the image's position
        image.style.left = `-${currentScrollPosition}px`;
      }, 100); // Small delay to ensure dimensions are fully stable
    };
  
    // Listen for the wheel event to scroll horizontally
    window.addEventListener('wheel', (event) => {
      const scrollDelta = event.deltaY > 0 ? 50 : -50;
      updateImagePosition(scrollDelta);
    });
  
    // Recalculate when the window is resized
    window.addEventListener('resize', () => {
      onImageLoadOrResize();
    });
  
    // Ensure the image is fully loaded before calculating scroll positions
    if (image.complete && image.naturalWidth) {
      onImageLoadOrResize();
    } else {
      // Wait for the image to load before calculating positions
      image.addEventListener('load', onImageLoadOrResize);
    }
  });
  