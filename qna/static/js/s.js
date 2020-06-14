var wrapper = document.querySelector(".wrapper");
var startButton = document.querySelector(".button-start");
var startHeader = document.querySelector(".start-header");
var apiUrl = "http://127.0.0.1:8000/quiz/api/";

var dataset = false;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    dataset = data;
  });

var questionBox = document.querySelector(".quiz-question");
var answerList = document.querySelector(".quiz-list");
var getQuestionWithAnswers = (number) => {
  var question = dataset[number].text;
  questionBox.innerHTML = question;
  var answers = dataset[number].answers;
  debugger;

  for (var i in answers) {
    // i oznacza iterację, a nie item
    debugger;
    var answer = `
        <li class="list-group-item">${answers[i].text}</li>
      `;
    answerList.innerHTML += answer;
  }
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

// var dataset;
// fetch(apiUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     dataset = data;
//     var list = data;
//     for (var i in list) {
//       var item = `
//           <div id="data-row-${i}>
//             <div style="flex:7">
//             <span>${list[i].text}</span></div>
//           </div>
//         `;

//       wrapper.innerHTML += item;
//     }
//     console.log(dataset);
//   });
