$(function(){

	var baseRoundLength = 15;
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
			"qText": "Who of the following is not a character in the Super Mario series?",
			"a1": "Mario",
			"a2": "Fredo",
			"a3": "Luigi",
			"a4": "Waluigi",
			"rightA": "Fredo",
			"answerPhrase": "Fredo was part of a much, much different family.",
			"category": "gaming"
		},

		"q2": {
			"qText": "Which of the following is not a Quentin Tarantino film?",
			"a1": "Reservoir Wolves",
			"a2": "Jackie Brown",
			"a3": "Grindhouse",
			"a4": "Inglorious Basterds",
			"rightA": "Reservoir Wolves",
			"answerPhrase": "Reservoir Dogs was the actual title.",
			"category": "film"
		},

		"q3": {
			"qText": "Which of the following is a city in Chile?",
			"a1": "San Jorge",
			"a2": "Curica",
			"a3": "Pachungi",
			"a4": "Pichilemu",
			"rightA": "Pichilemu",
			"answerPhrase": "Pichilemu is the only real city in Chile.",
			"category": "geography"
		},

		"q4": {
			"qText": "Which of the following is not an album released by Pearl Jam?",
			"a1": "Ten",
			"a2": "No Code",
			"a3": "Nevermind",
			"a4": "Binaural",
			"rightA": "Nevermind",
			"answerPhrase": "Nevermind was released by Nirvana in 1991.",
			"category": "music"
		},

		"q5": {
			"qText": "How many FIFA World Cups has Argentina won?",
			"a1": "1",
			"a2": "2",
			"a3": "3",
			"a4": "4",
			"rightA": "2",
			"answerPhrase": "Argentina won the World Cup in 1978 and 1986.",
			"category": "sports"
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

	function backgroundFade(category){
		//testing background fade
		var fadeBG = $("<div>");
		fadeBG.attr("Id", "bg2").addClass("bg").css("background-image", "url('assets/images/" + category + ".jpg").hide()
		.appendTo(".bgPool").fadeIn(function(){
			$("#bg1").css("background-image", "url('assets/images/" + category + ".jpg");
			$("#bg2").remove();
		});
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
				$("#qDiv").text("Incorrect. " + $(this).attr("data-answerPhrase"));
			}

			else if ($(this).hasClass("rightChoice")){
				$(".rightChoice").css("color", "green");
				correctNum += 1;
				var textDiv = $("<div>");
				$("#qDiv").text("Correct. " + $(this).attr("data-answerPhrase"));
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
			backgroundFade(qBox[gameQPool[roundNum]]["category"]);
			click = true;
			resetTimer();

			var qDiv = $("<div>");
			qDiv.text(qBox[gameQPool[roundNum]].qText).addClass("question col-md-12 text-center spacing backing blockHeight").attr("id", "qDiv").appendTo($questionSlot);

			for (var i = 1; i < 5; i++){
				var oDiv = $("<div>");
				oDiv.text(qBox[gameQPool[roundNum]]["a" + i])
					.addClass("option col-xs-12 col-md-6 text-center hoverOption")
					.attr("data-answerPhrase", qBox[gameQPool[roundNum]]["answerPhrase"])

				if(qBox[gameQPool[roundNum]]["a" + i] !== qBox[gameQPool[roundNum]].rightA){
					oDiv.addClass("wrongChoice");
				}
				else {
					oDiv.addClass("rightChoice");
				}
				oDiv.appendTo($optionSlot);
			}
			clock = setInterval(countdownTimer, 1000);
			$(".blockHeight").css("height", "75px");
		}
		else {
			backgroundFade("intro");
			$timer.hide();
			$(".blockHeight").css("height", "0");

			var $endBlock = $("<div>");
			$endBlock.addClass("backing").appendTo($optionSlot);

			var textDiv = $("<div>");
			textDiv.addClass("rightWrongText col-xs-12 text-center spacing").text("Game over").appendTo($endBlock);

			textDiv1 = $("<div>");
			textDiv1.addClass("rightWrongText col-xs-12 text-center spacing").text("Correct: " + correctNum).appendTo($endBlock);

			textDiv2 = $("<div>");
			textDiv2.addClass("rightWrongText col-xs-12 text-center spacing").text("Wrong: " + wrongNum).appendTo($endBlock);

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
			timesUpRound();

		}
	}

	function timesUpRound(){
		clearInterval(clock);
		$(".option").removeClass("hoverOption");
		roundNum += 1;
		click = false;
		setTimeout(newRound, 5000);	
		$(".rightChoice").css("color", "green");
		$("#qDiv").text("Out of time.");
	}
})