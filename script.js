// Your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress from session storage (if available)
let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('quiz-container');
  questionsElement.innerHTML = ''; // Clear existing content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    
    // Create question text
    const questionText = document.createElement("h3");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);
    
    // Create radio buttons for choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      
      // Pre-select answer if already stored in userAnswers
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener('change', () => {
        userAnswers[i] = choiceElement.value; // Save answer when selected
        saveProgress();
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save user's progress to sessionStorage
function saveProgress() {
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

// Submit the quiz and calculate score
function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  document.getElementById('score-container').textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score); // Store score in localStorage
}

// Show previous score from localStorage if available
function showPreviousScore() {
  const storedScore = localStorage.getItem('score');
  if (storedScore) {
    document.getElementById('previous-score').textContent = `Your last score was ${storedScore} out of 5.`;
  }
}

// Initialize the page
window.onload = () => {
  renderQuestions();
  showPreviousScore();
};
