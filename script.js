document.addEventListener('DOMContentLoaded', function () {
  const mainBoxes = document.querySelectorAll('.box-button');
  const smallBoxesContainer = document.getElementById('small-boxes-container');
  const returnButton = document.getElementById('returnButton');

  returnButton.style.visibility='hidden';

  const smallBoxImages = ['box1.png', 'box2.png', 'box3.png']; // Add other file names as needed
  const smallBoxLinks = ['', '', '']; // To be added to the github repositories

  mainBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      mainBoxes.forEach((elem) => elem.style.display='none');
      // Hide the main box buttons and show the small boxes and return button
      document.querySelector('.box-container').classList.add('hidden-box-buttons');
      smallBoxesContainer.classList.remove('hidden-small-boxes');

      
      returnButton.style.visibility='';

      // Determine the number of small boxes to generate based on the index of the clicked box
      let numberOfSmallBoxes = 0;
      switch (index) {
        case 0:
          numberOfSmallBoxes = 5;
          break;
        case 1:
          numberOfSmallBoxes = Math.floor(Math.random() * 3) + 3; // Generate 3 to 5 boxes
          break;
        case 2:
          numberOfSmallBoxes = 1;
          break;
        default:
          break;
      }

      // Generate the small boxes and set the background color
      for (let i = 1; i <= numberOfSmallBoxes; i++) {
        const smallBox = document.createElement('div');
        smallBox.classList.add('small-box');
        // smallBox.setAttribute("href", "https://google.com");
        smallBox.style.width = '30vw';
        smallBox.style.height = '30vw';
        smallBox.style.margin = '5px';
        smallBox.style.borderRadius = '5px';
        smallBox.style.backgroundColor = '#fefbf0';
        smallBoxesContainer.appendChild(smallBox);
      }

      // Add click event to small boxes to hide them when clicked
      const smallBoxes = document.querySelectorAll('.small-box');
      smallBoxes.forEach((smallBox) => {
        smallBox.addEventListener('click', () => {
          // Hide the small boxes and return button, and show the main box buttons
          document.querySelector('.box-container').classList.remove('hidden-box-buttons');
          smallBoxesContainer.classList.add('hidden-small-boxes');
        });
      });
    });
  });

  returnButton.addEventListener('click', () => {
    returnButton.style.visibility='hidden';
    mainBoxes.forEach((elem) => elem.style.display='');
    // Clear the existing small boxes if any
    smallBoxesContainer.innerHTML = '';
    // Hide the small boxes and return button, and show the main box buttons
    document.querySelector('.box-container').classList.remove('hidden-box-buttons');
    smallBoxesContainer.classList.add('hidden-small-boxes');
  });
});
