//Create an object to hold questions and answers

var triviaQuestions = [{
	question: "What is the first song Snow White sings in the film?",
	answerList: ["I’m Wishing", "One Song", "Whistle While You Work"],
	answer: 0
},{
	question: "Which dwarf steals extra kisses from Snow White?",
	answerList: ["Grumpy", "Bashful", "Dopey"],
	answer: 2
},{
	question: "What’s the name of the Queen’s hunter who she sends after Snow White?",
	answerList: ["Humbert", "Horrace", "Hansel"],
	answer: 0
},{
	question: "What’s the only thing that can revive Snow White, according to the Queen’s spell?",
	answerList: ["True love’s kiss", "Love’s first kiss", "A prince’s kiss"],
	answer: 1
},{
	question: "How does the Queen address her mirror when she wants to know who is the fairest of them all?",
	answerList: ["Mirror, mirror on the wall", "Magic mirror on the wall", "Mirror, mirror, come to life"],
	answer: 1

}];

//Variables
//=======================================================================================================
var imageArray = ["assets/images/snowWhiteSong.gif", "assets/images/Dopey.gif", "assets/images/Humbert.gif","assets/images/snow-white-kiss.gif","assets/images/magicMirror.gif" ];
//
var currentQuestion; 
var correctAnswer;
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
//object to hold messages
var messages = {
	correct: "Correct!",
	incorrect: "Wrong...",
	endTime: "Times Up!",
	finished: "Here's how you did."
}

$("#startBtn").on("click", function(){
    $(this).hide();
    console.log(this);
	newGame();
});

$("#startOverBtn").on("click", function(){
	$(this).hide();
	newGame();
});

//Functions
//===============================================================================================

function newGame(){
	$("#resultMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
	
	//sets up new questions & answerList
	$("#currentQuestion").html("Question "+ (currentQuestion+1));
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
	for(var i = 0; i < 3; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	//answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty(); //Clears question page
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$("#gif").html("<img src = " + imageArray[currentQuestion]+ " width = '400px'>");
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(resultPage, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function resultPage(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$("#resultMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Wanna play again?");
}