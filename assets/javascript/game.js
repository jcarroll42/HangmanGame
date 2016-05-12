	var hangman = {
		words: ["phaser", "picard", "worf", "data", "spock", "enterprise", "warp", "voyager", "kirk", "transporter", "starfleet", "wesley", "borg", "locutus", "klingon", "vulcan", "ferengi", "cardassian", "romulan", "lore", "gowron", "guinan", "sarek", "darmok", "betazoid", "bajoran", "tricorder", ],
		guesses: [],
		currentWord: [],
		currentAnswer: "",
		guessCounter: 10,
		scoreboard: "",
		wrongGuess: [],
		wins: 0,
		losses: 0,

		setCurrentAnswer: function(){
			this.currentAnswer = this.words[Math.floor(Math.random()*this.words.length)];
		},

		setCurrentWord: function(){
			this.currentWord = [];

			for(var i = 0; i < this.currentAnswer.length; i++){
				this.currentWord.push("_");
			}
		},

		resetGuesses: function(){
			this.guesses = [];
		},

		resetWrong: function(){
			this.wrongGuess = [];
		},


		checkGuess: function(a){
			var isWrong = true;
			
			for(var i = 0; i < this.currentAnswer.length; i++){


				if (a == this.currentAnswer.charAt(i)){
					this.currentWord[i]	= this.currentAnswer.charAt(i);
					isWrong = false;
				}
				
			}

			this.guesses.push(a);
			
			if(isWrong){
				this.guessCounter--;
				this.wrongGuess.push(a);
			}
		},

		isGuessed: function(j){
			var notGuessed = true;

			for(var i = 0; i < this.guesses.length; i++){
				if(j == this.guesses[i]){
					notGuessed = false;
				}
			}

			return notGuessed;
		},

		checkEmpties: function(){
			var isEmpty = false;

			for(var i = 0; i < this.currentWord.length; i++){
				if(this.currentWord[i] == "_"){
					return isEmpty;
				}

		}
			return true;

	},

		resetCounter: function(){
			this.guessCounter = 10;
		},

		printScoreboard: function(){
			var a = this.currentWord.join(" ");
			var b = this.wrongGuess.toString();

			this.scoreboard = "<h1>" + a + "</h1>" +
			"<p>Incorrect letters: " + b + "</p>" +
			"<p>Guesses left: " + this.guessCounter + "</p>" +
			"<p>Wins: " + this.wins + "</p>" +
			"<p>Losses: " + this.losses + "</p>";

			document.querySelector('#game').innerHTML = this.scoreboard;
		},

		printLoss: function(){
			var imgs = ['<img src="assets/images/sadpicard.jpg">', '<img src="assets/images/worfloss.jpeg">', '<img src="assets/images/wesleyloss.jpg">', '<img src="assets/images/spockloss.png">', '<img src="assets/images/kirkloss.jpg">'];

			var pickedImg = imgs[Math.floor(Math.random()*imgs.length)];

			document.querySelector('#winloss').innerHTML = "<h1>YOU LOSE!</h1>" + pickedImg + "<h2>The correct word was: " + this.currentAnswer + "</h2>" + "<h2>Play again? Type any letter to start new game</h2>";


		},

		printWin: function(){
			var imgs = ['<img src="assets/images/PicardWin.jpg">', '<img src="assets/images/worfwin.jpg">', '<img src="assets/images/datawin.jpg">', '<img src="assets/images/spockwin.jpg">', '<img src="assets/images/kirkwin.jpg">'];

			var pickedImg = imgs[Math.floor(Math.random()*imgs.length)];

			document.querySelector('#winloss').innerHTML = "<h1>YOU WIN!</h1>"  + pickedImg + "<h2>The correct word was: " + this.currentAnswer + "</h2>" + "<h2>Play again? Type any letter to start new game</h2>";


		},

		resetWinLoss: function(){
			document.querySelector('#winloss').innerHTML = "";
		}
}


	hangman.setCurrentAnswer();
	hangman.setCurrentWord();
	hangman.printScoreboard();

	document.onkeyup = function(event) {
		var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
		hangman.resetWinLoss();
		if(hangman.isGuessed(userGuess)){

			hangman.checkGuess(userGuess);
			hangman.printScoreboard();

			if (hangman.checkEmpties()){
				hangman.printWin();
				hangman.setCurrentAnswer();
				hangman.setCurrentWord();
				hangman.resetGuesses();
				hangman.resetCounter();
				hangman.resetWrong();
				hangman.wins++;
				hangman.printScoreboard();

			}

			if (hangman.guessCounter == 0){
				hangman.printLoss();
				hangman.resetGuesses();
				hangman.setCurrentAnswer();
				hangman.setCurrentWord();
				hangman.resetGuesses();
				hangman.resetCounter();
				hangman.resetWrong();
				hangman.losses++;
				hangman.printScoreboard();
			}

	}
}