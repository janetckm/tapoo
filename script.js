(function() {
  var questions = [{
    question: "What is your Age?",
    choices: ["18-29", "30-39", "40-49", "50-59", "60 or older"],
    getFive: 0,
    getFour: 1,
    getThree: 2,
    getTwo: 3,
    getOne: 4
  }, {
    question: "How often have you exercised in the last week?",
    choices: ["Everyday", "Sometimes", "Never"],
    getTwo: 0,
    getOne: 1
  }, {
    question: "When did you last eat?",
    choices: ["0 - 1 hours ago", "2 - 3 hours ago", "4 - 5 hours ago", "6 - 7 hours ago", "More than 8 hours ago"],
    getFive: 0,
    getFour: 1,
    getThree: 2,
    getTwo: 3,
    getOne: 4
  }, {
    question: "What food did you eat most last week?",
    choices: ["Insect", "Mycelium (Yeast)", "Soy Bean", "Vegetables", "Cereal"],
    getFive: 0,
    getFour: 1,
    getThree: 2,
    getTwo: 3,
    getOne: 4
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var addScore = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].getFive) {
        addScore += 5;
      } else if (selections[i] === questions[i].getFour){
        addScore += 4;
      } else if (selections[i] === questions[i].getThree){
        addScore += 3;
      } else if (selections[i] === questions[i].getTwo){
        addScore += 2;
      } else if (selections[i] === questions[i].getOne){
        addScore ++;
      }
    // var numCorrect = 0;
    // for (var i = 0; i < selections.length; i++) {
    //   if (selections[i] === questions[i].correctAnswer) {
    //     numCorrect++;
    //   }
    }

    score.append('You got ' + addScore + '!');
    return score;
  }
})();
