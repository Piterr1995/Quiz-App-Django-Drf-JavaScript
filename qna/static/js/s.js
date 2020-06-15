var wrapper = document.querySelector(".wrapper");
var startButton = document.querySelector(".button-start");
var startHeader = document.querySelector(".start-header");
var apiUrl = "http://127.0.0.1:8000/quiz/api/";

// getting the data from api and putting it into a variable
var dataset = false;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    dataset = data;
  });

var listItems;
var getQuestionWithAnswers = (number) => {
  // getting a question with possible answers
  var questionBox = document.querySelector(".quiz-question");
  var answerList = document.querySelector(".quiz-list");
  var question = dataset[number].text;
  questionBox.innerHTML = question;
  var answers = dataset[number].answers;

  answers.forEach((answer) => {
    var answer = `
    <li class="list-group-item" id=${answer.id}>${answer.text}</li>
  `;

    answerList.innerHTML += answer;
  });

  listItems = [...document.querySelectorAll(".list-group-item")];
  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      var activeItem = document.querySelector(".active");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      e.target.classList.add("active");
    });
  });
  debugger;
};

startButton.addEventListener("click", () => {
  $(startButton).fadeOut();
  $(startHeader).fadeOut();
  $(wrapper).fadeIn();
  getQuestionWithAnswers(0);
});

var chuj = document.querySelector(".chuj");
chuj.addEventListener("click", () => {
  alert("chuj");
});
