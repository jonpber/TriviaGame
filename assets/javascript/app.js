var baseRoundLength = 30;
var roundLength = baseRoundLength;
var $timerText = $(".timer");
var $questionSlot = $(".questionSlot");
var $optionSlot = $(".optionSlot");
var $timer = $(".timerDiv");
var roundNum = 0;
var correctNum = 0;
var wrongNum = 0;
var click = true;
var clock;

var qBox = {
	"q1": {
		"qText": "Who of the following is not a Super Mario Character?",
		"a1": "Mario",
		"a2": "Fredo",
		"a3": "Luigi",
		"a4": "Waluigi",
		"rightA": "Fredo",
	},

	"q2": {
		"qText": "Which of the following is not a Quentin Tarantino film?",
		"a1": "Reservoir Wolves",
		"a2": "Jackie Brown",
		"a3": "Grindhouse",
		"a4": "Inglorious Basterds",
		"rightA": "Reservoir Wolves",
	},

	"q3": {
		"qText": "Which of the following is a city in Chile?",
		"a1": "San Jose",
		"a2": "Curica",
		"a3": "Pachungi",
		"a4": "Pichilemu",
		"rightA": "Pichilemu",
	}
}

var gameQPool = Object.keys(qBox);

function shuffleQs(){
	var currentIndex = gameQPool.length, tempValue, randomIndex;

	while (currentIndex !== 0){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempValue = gameQPool[currentIndex];
		gameQPool[currentIndex] = gameQPool[randomIndex];

		gameQPool[randomIndex] = tempValue;
	}
}

function startGame() {
	correctNum = 0;
	wrongNum = 0;
	roundNum = 0;
	click = true;
	$timer.show();
	shuffleQs();
	newRound(qBox[gameQPool[roundNum]]);
}

$($optionSlot).on("click", ".option", function(){
	if (click){
		$(".option").removeClass("hoverOption");
		clearInterval(clock);
		if ($(this).hasClass("wrongChoice")){
			$(".wrongChoice").css("color", "red");
			wrongNum += 1;
			var textDiv = $("<div>");
			textDiv.addClass("rightWrongText col-xs-12 text-center spacing").text("Incorrect").prependTo($optionSlot);
		}

		else if ($(this).hasClass("rightChoice")){
			$(".rightChoice").css("color", "green");
			correctNum += 1;
			var textDiv = $("<div>");
			textDiv.addClass("rightWrongText col-xs-12 text-center spacing").text("Correct").prependTo($optionSlot);
		}
		roundNum += 1;
		click = false;
		setTimeout(newRound, 5000);
	}
});

$(document).on("click", "button", function(){
	startGame();
});

function newRound(){
	$optionSlot.empty();
	$questionSlot.empty();

	if (roundNum < gameQPool.length){
		click = true;
		resetTimer();

		var qDiv = $("<div>");
		qDiv.text(qBox[gameQPool[roundNum]].qText).addClass("question col-md-12 text-center spacing").appendTo($questionSlot);

		for (var i = 1; i < 5; i++){
			var oDiv = $("<div>");
			oDiv.text(qBox[gameQPool[roundNum]]["a" + i]);
			oDiv.addClass("option col-xs-12 col-md-6 text-center hoverOption");
			if(qBox[gameQPool[roundNum]]["a" + i] !== qBox[gameQPool[roundNum]].rightA){
				oDiv.addClass("wrongChoice");
			}
			else {
				oDiv.addClass("rightChoice");
			}
			oDiv.appendTo($optionSlot);
		}
		clock = setInterval(countdownTimer, 1000);
	}
	else {
		$timer.hide();

		var textDiv = $("<div>");
		textDiv.addClass("rightWrongText col-xs-12 text-center spacing").text("Game over").appendTo($optionSlot);

		textDiv1 = $("<div>");
		textDiv1.addClass("rightWrongText col-xs-12 text-center spacing").text("Correct: " + correctNum).appendTo($optionSlot);

		textDiv2 = $("<div>");
		textDiv2.addClass("rightWrongText col-xs-12 text-center spacing").text("Wrong: " + wrongNum).appendTo($optionSlot);

		restartButton = $("<button>");
		restartButton.addClass("text-center").text("Restart").appendTo($optionSlot);
	}
}

function resetTimer(){
	roundLength = baseRoundLength;
	$timerText.text(roundLength);
}

function countdownTimer(){
	if (roundLength > 0){
		roundLength -= 1;
		$($timerText).text(roundLength);
	}

	else {
		console.log ("it's done");
		timesUpRound();

	}
}

function timesUpRound(){
	clearInterval(clock);
	roundNum += 1;
	click = false;
	setTimeout(newRound, 5000);	
	$(".rightChoice").css("color", "green");
	var textDiv = $("<div>");
	textDiv.addClass("rightWrongText col-xs-12 text-center").text("Out of time").prependTo($optionSlot);



}
