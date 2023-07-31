document.addEventListener('DOMContentLoaded', function () {
  const mainBoxes = document.querySelectorAll('.box-button');
  const smallBoxesContainer = document.getElementById('small-boxes-container');
  const returnButton = document.getElementById('returnButton');

  returnButton.style.visibility='hidden';

  const smallBoxImages = ['box1.png', 'box2.png', 'box3.png']; // Add other file names as needed
  const smallBoxLinks = ['', '', '']; // To be added to the github repositories
  const smallBoxInfo1 = [
    { title: 'Suicidal posts detection', text: 'This project involved comparing and utilizing multiple algorithms to predict labels for suicidal and general posts sourced from Reddit.' },
    { title: 'Cytolytics Cell Type Detection', text: 'During my internship at the esteemed company, Cytolytics, I undertook a project wherein I adeptly devised and implemented methodologies aimed at discerning the correlation between various cell types and their respective marker sets.' },
    { title: 'Vocabulary Learning Model for Children', text: 'This model utilizes MDA framework mechanics to enhance children\'s language learning with a key focus on gamification as a rewarding system.' },
    { title: 'Political Speech Annotation', text: 'This project involved a thorough political corpus annotation task, covering four distinct layers of annotation: lemma, part of speech (POS), named entity, and coreference.' },
    { title: 'Enhancing Chinese Text Classification with Radical Features', text: 'For my master\'s final project at Eberhard Karl University of Tübingen, I demonstrated the significance and provided evidence that incorporating radical segmentation in Chinese text classification yields better results, particularly in low-resource training settings compared to traditional word and character segmentation.' },
  ];

  const smallBoxInfo2 = [
    { title: 'Suicidal posts detection', text: 'This project involved comparing and utilizing multiple algorithms to predict labels for suicidal and general posts sourced from Reddit.' },
    { title: 'Cytolytics Cell Type Detection', text: 'During my internship at the esteemed company, Cytolytics, I undertook a project wherein I adeptly devised and implemented methodologies aimed at discerning the correlation between various cell types and their respective marker sets.' },
    { title: 'Vocabulary Learning Model for Children', text: 'This model utilizes MDA framework mechanics to enhance children\'s language learning with a key focus on gamification as a rewarding system.' },
    ];

  const smallBoxInfo3 = [
    { title: 'Software Translation', text: 'I provided the Chinese translation of inlang - a globalization infrastructure for software ' },
   ];

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
          numberOfSmallBoxes = 3; // Generate 3 to 5 boxes
          break;
        case 2:
          numberOfSmallBoxes = 1;
          break;
        default:
          break;
      }

      // Determine the smallBoxInfo
      let smallBoxInfo = smallBoxInfo3;
      
      if (numberOfSmallBoxes == 5) {
        smallBoxInfo = smallBoxInfo1;
      } else if (numberOfSmallBoxes == 3) {
        smallBoxInfo = smallBoxInfo2;
      }

      // console.log(smallBoxInfo[1])
      // Generate the small boxes and set the background color
      for (let i = 0; i < numberOfSmallBoxes; i++) {
        const smallBoxContainer = document.createElement('div');
        smallBoxContainer.classList.add('small-box-container');

        // Create smallBox element
        const smallBox = document.createElement('div');
        smallBox.classList.add('small-box');
        // smallBox.setAttribute("href", "https://google.com");
        smallBox.style.width = '30vw';
        smallBox.style.height = '30vw';
        smallBox.style.margin = '5px';
        smallBox.style.borderRadius = '5px';
        smallBox.style.backgroundColor = '#fefbf0';
        // smallBoxesContainer.appendChild(smallBox);
      

        // Create the title element with bold styling
        const titleElement = document.createElement('p');
        titleElement.classList.add('small-box-title');
        titleElement.textContent = smallBoxInfo[i].title;
        titleElement.style.color = 'white';
        // smallBoxContainer.appendChild(titleElement);

        // Create the content element for the text
        const contentElement = document.createElement('p');
        contentElement.textContent = smallBoxInfo[i].text;
        contentElement.style.color = 'black';
        // smallBox.appendChild(contentElement);

        // Append elements to the smallBoxContainer
        smallBoxContainer.appendChild(smallBox);
        smallBoxContainer.appendChild(titleElement);
        smallBox.appendChild(contentElement);
        
        smallBoxesContainer.appendChild(smallBoxContainer);
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