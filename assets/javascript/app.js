var baseRoundLength = 5;
var roundLength = baseRoundLength;
var $timerText = $(".timer");
var $questionSlot = $(".questionSlot");
var $optionSlot = $(".optionSlot");

var qBox = {
	"q1": {
		"qText": "Which of these is not a Super Mario Character?",
		"a1": "Mario",
		"a2": "Fredo",
		"a3": "Luigi",
		"a4": "Waluigi",
		"rightA": "Fredo",
	},

	"q2": {
		"qText": "Which of these is not a Quentin Tarantino film?",
		"a1": "Reservoir Wolves",
		"a2": "Jackie Brown",
		"a3": "Grindhouse",
		"a4": "Inglorious Basterds",
		"rightA": "Reservoir Wolves",
	},

	"q3": {
		"qText": "Test Q?",
		"a1": "B",
		"a2": "E",
		"a3": "F",
		"a4": "G",
		"rightA": "B",
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
	console.log (gameQPool);
}

function startGame() {
	shuffleQs();
	newRound(qBox[gameQPool[0]]);
}



$($optionSlot).on("click", ".option", function(){
	if ($(this).hasClass("wrongChoice")){
		$(".wrongChoice").css("color", "red");
	}

});

function newRound(question){
	var qDiv = $("<div>");
	qDiv.text(question.qText);
	qDiv.addClass("question");
	qDiv.appendTo($questionSlot);

	for (var i = 1; i < 5; i++){
		var oDiv = $("<div>");
		oDiv.text(question["a" + i]);
		oDiv.addClass("option");
		if(question["a" + i] !== question.rightA){
			oDiv.addClass("wrongChoice");
		}
		else {
			oDiv.addClass("rightChoice");
		}
		oDiv.appendTo($optionSlot);
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
}

resetTimer();
var clock = setInterval(countdownTimer, 1000);

startGame();