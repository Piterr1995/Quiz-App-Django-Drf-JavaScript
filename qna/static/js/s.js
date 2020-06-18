// CSRF TOKEN needs to be sent to django in a cookie
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie("csrftoken");

var wrapper = document.querySelector(".wrapper");
var startButton = document.querySelector(".button-start");
var startHeader = document.querySelector(".start-header");
var apiUrl = "http://127.0.0.1:8000/quiz/api/";

var currentQuestionNumber = 0;

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
};

startButton.addEventListener("click", () => {
  $(startButton).fadeOut();
  $(startHeader).fadeOut("slow", () => {
    $(wrapper).fadeIn();
  });

  getQuestionWithAnswers(currentQuestionNumber);
});

var chuj = document.querySelector(".chuj");
chuj.addEventListener("click", () => {
  alert("chuj");
});

var submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
  var url = "http://127.0.0.1:8000/quiz/answer/";

  var answer = document.querySelector(".active").innerHTML;
  fetch(url, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: answer,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  $(".wrapper").fadeOut(250, () => {
    if (currentQuestionNumber == dataset.length - 1) {
      alert("finished");
    } else {
      currentQuestionNumber++;
      removeCurrentAnswers();
    }
  });
});

var removeCurrentAnswers = () => {
  document
    .querySelectorAll(".list-group-item")
    .forEach((item) => item.remove());
  getQuestionWithAnswers(currentQuestionNumber);
  $(".wrapper").fadeIn();
};

debugger;
