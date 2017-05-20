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
	var rightSound = new Audio ("assets/sounds/success.wav");
	var wrongSound = new Audio ("assets/sounds/fail.wav");
	var buzzerSound = new Audio ("assets/sounds/buzzer.wav");
	var clickSound = new Audio ("assets/sounds/click.wav");
	var victorySound = new Audio ("assets/sounds/victory.mp3");
	var smallVictorySound = new Audio ("assets/sounds/smallvictory.mp3");	
	var lossSound = new Audio ("assets/sounds/lossMusic.wav");	

	var gameLength = 7;

	var qBox = {
		"q1": {
			"qText": "Who of the following is not a character in the Super Mario series?",
			"a1": "Mario",
			"a2": "Fredo",
			"a3": "Luigi",
			"a4": "Waluigi",
			"rightA": "Fredo",
			"answerPhrase": "Fredo was part of a much more violent family.",
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
		},

		"q6": {
			"qText": "Which Emperor was famously blamed with burning Rome?",
			"a1": "Caligula",
			"a2": "Nero",
			"a3": "Commodus",
			"a4": "Augustus",
			"rightA": "Nero",
			"answerPhrase": "Nero is blamed for burning Rome in order to rebuild it to his liking.",
			"category": "history"
		},

		"q7": {
			"qText": "What is the highest-selling video game of all time?",
			"a1": "Tetris",
			"a2": "Minecraft",
			"a3": "Wii Sports",
			"a4": "Grand Theft Auto V",
			"rightA": "Tetris",
			"answerPhrase": "At over 495 million copies sold, Tetris is the highest-selling video game of all time.",
			"category": "gaming"
		},

		"q8": {
			"qText": "Who directed Mad Max: Fury Road?",
			"a1": "Frank Miller",
			"a2": "John Carpenter",
			"a3": "Josh Trank",
			"a4": "George Miller",
			"rightA": "George Miller",
			"answerPhrase": "George Miller directed every Mad Max film (and Happy Feet).",
			"category": "film"
		},

		"q9": {
			"qText": "Which member of The Beatles wrote the song 'Here Comes the Sun'?",
			"a1": "Paul McCartney",
			"a2": "John Lennon",
			"a3": "George Harrison",
			"a4": "Ringo Starr",
			"rightA": "George Harrison",
			"answerPhrase": "George Harrison wrote 'Here Comes the Sun' at Eric Clapton's country house.",
			"category": "music"
		},

		"q10": {
			"qText": "In which century did the Italian Renaissance begin?",
			"a1": "13th Century",
			"a2": "14th Century",
			"a3": "15th Century",
			"a4": "16th Century",
			"rightA": "14th Century",
			"answerPhrase": "The Italian Renaissance first began in the 14th century, reaching its height in the 15th century.",
			"category": "history"
		},

		"q11": {
			"qText": "Who currently holds the record for fastest man in the world?",
			"a1": "Tyson Gay",
			"a2": "Asafa Powell",
			"a3": "Maurice Greene",
			"a4": "Usain Bolt",
			"rightA": "Usain Bolt",
			"answerPhrase": "Usain Bolt currently holds the record for 100m and 200m sprints, making him the fastest man in the world.",
			"category": "sports"
		},

		"q12": {
			"qText": "What is the capital of Madagascar?",
			"a1": "Antananarivo",
			"a2": "Pretoria",
			"a3": "Windhoek",
			"a4": "Luanda",
			"rightA": "Antananarivo",
			"answerPhrase": "Antananarivo is Madagascar's capital.",
			"category": "geography"
		},

		"q13": {
			"qText": "How many viewers watched M.A.S.H.'s series finale?",
			"a1": "80 million",
			"a2": "100 million",
			"a3": "125 million",
			"a4": "150 million",
			"rightA": "125 million",
			"answerPhrase": "M.A.S.H's series finale garnered 125 million viewers, making it the most watched series finale ever.",
			"category": "television"
		},

		"q14": {
			"qText": "Who was not a member of the Seinfeld cast?",
			"a1": "Cosmo Kramer",
			"a2": "George Costanza",
			"a3": "Elaine Benes",
			"a4": "Ross Geller",
			"rightA": "Ross Geller",
			"answerPhrase": "Ross Geller was a member of the tv show Friends played by David Schwimmer.",
			"category": "television"
		},

		"q15": {
			"qText": "What kind of animal was the video game character Sonic?",
			"a1": "Echidna",
			"a2": "Hedgehog",
			"a3": "Squirrel",
			"a4": "Turtle",
			"rightA": "Hedgehog",
			"answerPhrase": "Sonic the Hedgehog is Sega's mascot character.",
			"category": "gaming"
		},

		"q16": {
			"qText": "How many Academy Awards did the movie Titanic win?",
			"a1": "6",
			"a2": "8",
			"a3": "11",
			"a4": "13",
			"rightA": "11",
			"answerPhrase": "Titanic tied Ben-Hur for most Academy Awards won with 11 wins.",
			"category": "film"
		}


	}

	var gameQPool = Object.keys(qBox);

	function preload(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	        $('<img/>')[0].src = this;
		 });
	}

	preload([
	    'assets/images/television.jpg', 
	    'assets/images/music.jpg',
		'assets/images/film.jpg', 
		'assets/images/sports.jpg', 
		'assets/images/history.jpg',
		'assets/images/gaming.jpg', 
		'assets/images/geography.jpg']);

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
		var $this = $(this);
		var $parent = $this.parent();
		if (click){
			$(".option").removeClass("hoverOption");
			clearInterval(clock);
			if ($this.hasClass("wrongChoice")){
				wrongSound.play();
				$(".wrongChoice").css("color", "red");
				wrongNum += 1;
				$("#qDiv").text("Sorry, " + $parent.attr("data-rightAnswer") + " was the correct answer.");
			}

			else if ($this.hasClass("rightChoice")){
				rightSound.play();
				$(".rightChoice").css("color", "green");
				correctNum += 1;
				var textDiv = $("<div>");
				$("#qDiv").text("Correct. " + $parent.attr("data-answerPhrase"));
			}
			roundNum += 1;
			click = false;
			setTimeout(newRound, 4500);
		}
	});

	function newRound(){
		$optionSlot.empty();
		$questionSlot.empty();

		if (roundNum < gameLength){
			backgroundFade(qBox[gameQPool[roundNum]]["category"]);
			click = true;
			resetTimer();

			var qDiv = $("<div>");
			qDiv.text(qBox[gameQPool[roundNum]].qText).addClass("question col-md-12 text-center spacing backing blockHeight").attr("id", "qDiv").appendTo($questionSlot);

			for (var i = 1; i < 5; i++){
				var oDiv = $("<div>");
				oDiv.text(qBox[gameQPool[roundNum]]["a" + i]).addClass("option col-xs-12 text-center hoverOption")
					
				if(qBox[gameQPool[roundNum]]["a" + i] !== qBox[gameQPool[roundNum]].rightA){
					oDiv.addClass("wrongChoice");
				}
				else {
					oDiv.addClass("rightChoice");
				}
				oDiv.appendTo($optionSlot);
				($optionSlot).attr("data-answerPhrase", qBox[gameQPool[roundNum]]["answerPhrase"])
					.attr("data-rightAnswer", qBox[gameQPool[roundNum]]["rightA"]);
			}
			clock = setInterval(countdownTimer, 1000);

		}
		else {
			backgroundFade("intro");
			$timer.hide();

			var endTextClass = "rightWrongText col-xs-12 text-center lineSpacing";

			var $endBlock = $("<div>");
			$endBlock.addClass("backing").appendTo($optionSlot);

			var textDiv = $("<div>");
			textDiv.addClass(endTextClass).text("Game over").appendTo($endBlock);

			var textDiv1 = $("<div>");
			textDiv1.addClass(endTextClass).text("Correct: " + correctNum).appendTo($endBlock);

			var textDiv2 = $("<div>");
			textDiv2.addClass(endTextClass).text("Wrong: " + wrongNum).appendTo($endBlock);

			if (correctNum >= gameLength -1){
				$($endBlock).append("<img class='endImg' src='assets/images/1st.png'>");
				var textDiv3 = $("<div>");
				textDiv3.addClass(endTextClass).text("You're a superstar!").appendTo($endBlock);
				victorySound.play();

			}

			else if (correctNum >= gameLength -3){
				$($endBlock).append("<img class='endImg' src='assets/images/2nd.png'>");
				var textDiv3 = $("<div>");
				textDiv3.addClass(endTextClass).text("Well done.").appendTo($endBlock);
				smallVictorySound.play();
			}

			else {
				var textDiv3 = $("<div>");
				textDiv3.addClass(endTextClass).text("You might want to brush up on your trivia.").appendTo($endBlock);
				lossSound.play();
			}

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
		buzzerSound.play();
		$(".option").removeClass("hoverOption");
		roundNum += 1;
		click = false;
		setTimeout(newRound, 4500);	
		$(".rightChoice").css("color", "green");
		$("#qDiv").text("Out of time. " + $(".optionSlot").attr("data-rightAnswer") + " was the correct answer.");
	}

	$(document).on("click", "button", function(){
		clickSound.play();
		startGame();
	});
})