var baseRoundLength = 30;
var roundLength = baseRoundLength;
var $timerText = $(".timer");
var $questionSlot = $(".questionSlot");
var $optionSlot = $(".optionSlot");
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
	shuffleQs();
	newRound(qBox[gameQPool[roundNum]]);
}

$($optionSlot).on("click", ".option", function(){
	if (click){
		clearInterval(clock);
		if ($(this).hasClass("wrongChoice")){
			$(".wrongChoice").css("color", "red");
			wrongNum += 1;
			var textDiv = $("<div>");
			textDiv.addClass("rightWrongText").text("Incorrect").prependTo($optionSlot);
		}

		else if ($(this).hasClass("rightChoice")){
			$(".rightChoice").css("color", "green");
			correctNum += 1;
			var textDiv = $("<div>");
			textDiv.addClass("rightWrongText").text("Correct").prependTo($optionSlot);
		}
		roundNum += 1;
		click = false;
		setTimeout(newRound, 5000);
	}
});

function newRound(){
	click = true;
	resetTimer();
	$optionSlot.empty();
	$questionSlot.empty();
	var qDiv = $("<div>");
	qDiv.text(qBox[gameQPool[roundNum]].qText).addClass("question").appendTo($questionSlot);

	for (var i = 1; i < 5; i++){
		var oDiv = $("<div>");
		oDiv.text(qBox[gameQPool[roundNum]]["a" + i]);
		oDiv.addClass("option");
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
	textDiv.addClass("rightWrongText").text("Out of time").prependTo($optionSlot);



}

startGame();