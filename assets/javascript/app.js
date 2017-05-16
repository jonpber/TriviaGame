var baseRoundLength = 5;
var roundLength = baseRoundLength;
var $timerText = $(".timer");
var $questionSlot = $(".questionSlot");
var $optionSlot = $(".optionSlot");

var qPool = {
	"q1": {
		"qText": "Which of these is not a Super Mario Character?",
		"a1": "Mario",
		"a2": "Fredo",
		"a3": "Luigi",
		"a4": "Waluigi",
		"rightA": "Fredo",
	}
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

newRound(qPool.q1);


function resetTimer (){
	roundLength = baseRoundLength;
	$timerText.text(roundLength);
}

function countdownTimer (){
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