document.addEventListener('DOMContentLoaded', function () {
  const mainBoxes = document.querySelectorAll('.box-button');
  const mainBoxesTitles = document.querySelectorAll('.boxtitle');
  const smallBoxesContainer = document.getElementById('small-boxes-container');
  // const returnButton = document.getElementById('returnButton');

  // returnButton.style.visibility='hidden';

  const smallBoxImages = [
    ['icons/suicidal.png', 'icons/cytolytics.png', 'icons/wordLearning.png', 'icons/politic.png', 'icons/thesis.png'],
    ['icons/weather.png', 'icons/todo.png', 'icons/inventory.png'],
    ['icons/inlang.png']
  ];
  const smallBoxLinksNLP = ['https://github.com/yixuanwu4/Suicidal-posts-detection-SNLP-', 'https://github.com/yixuanwu4/Cytolytics-NLP', 'https://github.com/yixuanwu4/Adaptive-Learning-Project-vocabulary-learning-model-', 'https://github.com/yixuanwu4/Trump-Speeches-Corpus-Annotation', 'https://github.com/yixuanwu4/Thesis']; // To be added to the github repositories
  const smallBoxLinksWeb = ['https://github.com/yixuanwu4/Suicidal-posts-detection-SNLP-', 'https://github.com/yixuanwu4/Cytolytics-NLP', 'https://github.com/yixuanwu4/Adaptive-Learning-Project-vocabulary-learning-model-', 'https://github.com/yixuanwu4/Trump-Speeches-Corpus-Annotation', 'https://github.com/yixuanwu4/Thesis']; // To be added to the github repositories
  const smallBoxLinksTranslate = ['https://inlang.com/zh/']; // To be added to the github repositories

  const smallBoxInfo1 = [
    { title: 'Suicidal posts detection', text: 'This project involved comparing and utilizing multiple algorithms to predict labels for suicidal and general posts sourced from Reddit.' },
    { title: 'Cytolytics Cell Type Detection', text: 'During my internship at the esteemed company, Cytolytics, I undertook a project wherein I adeptly devised and implemented methodologies aimed at discerning the correlation between various cell types and their respective marker sets.' },
    { title: 'Vocabulary Learning Model for Children', text: 'This model utilizes MDA framework mechanics to enhance children\'s language learning with a key focus on gamification as a rewarding system.' },
    { title: 'Political Speech Annotation', text: 'This project involved a thorough political corpus annotation task, covering four distinct layers of annotation: lemma, part of speech (POS), named entity, and coreference.' },
    { title: 'Enhancing Chinese Text Classification with Radical Features', text: 'For my master\'s final project at Eberhard Karl University of Tübingen, I demonstrated the significance and provided evidence that incorporating radical segmentation in Chinese text classification yields better results, particularly in low-resource training settings compared to traditional word and character segmentation.' },
  ];

  const smallBoxInfo2 = [
    { title: 'Weather App', text: 'This app allows users to check the weather of an location by typing in the city name. (OpenWeatherMap API is used)' },
    { title: 'To Do App', text: 'This app allows users to add and delete items from the to do list. Items on the to do list are saved locally.' },
    { title: 'Inventory Management System', text: 'This a a simplified process of ordering, storing and tracking goods throughout the "supply chain".' },
    ];

  const smallBoxInfo3 = [
    { title: 'Software Translation', text: 'I provided the Chinese translation of inlang - a globalization infrastructure for software ' },
   ];

  mainBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      mainBoxes.forEach((elem) => elem.style.display='none');
      mainBoxesTitles.forEach((elem) => elem.style.display='none');
      // Hide the main box buttons and show the small boxes and return button
      document.querySelector('.box-container').classList.add('hidden-box-buttons');
      smallBoxesContainer.classList.remove('hidden-small-boxes');

      
      // returnButton.style.visibility='';
      // returnButton.style.backgroundImage = `url('../icons/back.png')`;
      // returnButton.style.backgroundSize = 'contain';
      // returnButton.style.width = '5vw';
      // returnButton.style.height = '5vw';

      // Determine the number of small boxes to generate based on the index of the clicked box
      let numberOfSmallBoxes = 0;
      switch (index) {
        case 0:
          numberOfSmallBoxes = 5;
          smallBoxImagesList = smallBoxImages[0];
          smallBoxLinks = smallBoxLinksNLP;
          break;
        case 1:
          numberOfSmallBoxes = 3; 
          smallBoxImagesList = smallBoxImages[1];
          smallBoxLinks = smallBoxLinksWeb;
          break;
        case 2:
          numberOfSmallBoxes = 1;
          smallBoxImagesList = smallBoxImages[2];
          smallBoxLinks = smallBoxLinksTranslate;
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
        const smallBox = document.createElement('a');
        smallBox.classList.add('small-box');
        smallBox.setAttribute("href", `${smallBoxLinks[i]}`);
        smallBox.target = '_blank'; // Open link in a new tab
        smallBox.style.width = '16vw';
        smallBox.style.height = '16vw';
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
        // Set small box image
        smallBox.style.backgroundImage = `url(${smallBoxImagesList[i]})`;

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


      // Push the current URL to the browser's history
      history.pushState({ view: 'small-boxes' }, 'Small Boxes', '#' + index);

    });
  });

  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.view === 'small-boxes') {
      // Show the small boxes container
      smallBoxesContainer.classList.remove('hidden-small-boxes');
      // Hide the main box buttons
      document.querySelector('.box-container').classList.add('hidden-box-buttons');
    } else {
      // Hide the small boxes container
      smallBoxesContainer.classList.add('hidden-small-boxes');
      // Show the main box buttons
      document.querySelector('.box-container').classList.remove('hidden-box-buttons');
      
      // Clear the existing small boxes if any
      smallBoxesContainer.innerHTML = '';
  
      // Show the main box buttons and titles
      mainBoxes.forEach((elem) => (elem.style.display = ''));
      mainBoxesTitles.forEach((elem) => (elem.style.display = ''));
    }
  });
  
  


  // returnButton.addEventListener('click', () => {
  //   returnButton.style.visibility='hidden';
  //   mainBoxes.forEach((elem) => elem.style.display='');
  //   // Clear the existing small boxes if any
  //   smallBoxesContainer.innerHTML = '';
  //   // Hide the small boxes and return button, and show the main box buttons
  //   document.querySelector('.box-container').classList.remove('hidden-box-buttons');
  //   smallBoxesContainer.classList.add('hidden-small-boxes');
  // });

  

  const animatedElements = document.querySelectorAll('.animated-element');


  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
  },
  { threshold: 0.5
  });

  // Observe each animated element
  for (let i = 0; i < animatedElements.length; i++) {
    const elements = animatedElements[i];
 
    intersectionObserver.observe(elements);
   } 
});