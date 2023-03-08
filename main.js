//array of all available words to guess from

const wordBank = [
'snarl',
 'dominate', 
//  'retailer', 'prejudice', 'integration',
// 'separation', 'tradition', 'ghostwriter', 'section', 'decay',
// 'convention', 'admission', 'diagram', 'ecstasy', 'activity',
// 'medieval', 'brainstorm', 'portrait', 'moving', 'modernize',
// 'dedicate', 'plagiarize', 'underline', 'consensus', 'litigation',
// 'deteriorate', 'jazz', 'azure', 'pneumonia', 'wheezy',
// 'rickshaw', 'jukebox', 'khaki', 'flyby', 'zombie',
// 'vodka', 'larynx', 'espionage', 'mnemonic', 'pizza',
// 'hamburger', 'jaywalk', 'uncle', 'freshman', 'continental',
// 'marathon', 'unlike', 'compose', 'sunshine', 'figure',
// 'advance', 'translate', 'angel', 'potential', 'question',
// 'abolish', 'daughter', 'multiply', 'panic', 'attack',
// 'future' , 'divide', 'friend', 'doctor', 'testament'
]

//declaring game and its parameters

const youWon = "You Won!"
const youLost = "You Lost!"

function Game() {

    //code used to grab a random word from the wordBank array

    let word = wordBank[Math.floor(Math.random() * wordBank.length)];
    word = word.toUpperCase();

    //declaring variables we will be using to determine whether the user has won or not
    let guessedLetters = [];
    let hiddenWord = "";
    let wrongGuesses = 0;
    let possibleGuesses = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let won = false;
    let lost = false;
    const maxGuesses = 8;

	//used to determine if we leave a guess as _ if incorrect or replace it with a letter if correct

    for (let i = 0; i < word.length; i++) {
        let space = " ";
        let nextLetter = word.charAt(i) === space ? space : '_';
        hiddenWord += nextLetter;
    }

	//logic used to push in correct letter guesses

    let guess = function(letter) {
        letter = letter.toUpperCase();
        if( !guessedLetters.includes( letter)) {
            guessedLetters.push(letter);
            possibleGuesses = possibleGuesses.replace(letter, "");
            if( word.includes( letter)) {
                let correctGuess = [];
                for( let i= 0; i < word.length; i++) {
                    if( word.charAt(i) === letter) {
                        correctGuess.push(i);
                    }
                }
                correctGuess.forEach( function(index) {
                    hiddenWord = replace( hiddenWord, index, letter);
                })
                if( !lost) {
                    won = hiddenWord === word;
                }
            }
            else {
                wrongGuess();
            }
        }
    }

	//as long as the amount of guesses is less than the amount of max guess then we will add a counter to wrong guesses and continue to play the game

    let wrongGuess = function() {
        wrongGuesses++;
        lost = wrongGuesses >= maxGuesses;
    }
	
    return {
		"getHiddendWord": function(){ return hiddenWord; },
		"guess": guess,
		"getPossibleGuesses": function(){ return [... possibleGuesses]; },
		"getWrongGuesses": function(){ return wrongGuesses; },
		"isWon": function(){ return won; },
		"isLost": function(){ return lost; },
    }


}

//function for moving correctly guessed letters into the correct index of letter

function replace( value, index, replacement ) 
{
    return value.substr(0, index) + replacement + value.substr(index + replacement.length);	
}

function listenForInput( game ) 
{
	let guessLetter = function( letter )
	{
		if( letter )
		{
			let gameStillGoing = !game.isWon() && 
								 !game.isLost();
			if( gameStillGoing )
			{
				game.guess( letter );
				render( game );
			}
		}
	};

	//listening for click on the buttons and inputting said click into the guess container

	let handleClick = function( event )
	{
	    if (event.target.classList.contains('guess') )
	    {
	    	guessLetter( event.target.innerHTML );
	    }
	}

	

	document.body.addEventListener('click', handleClick );
}

//code for launching the game and setting up the win and lose parameters

function render( game )
{
    document.getElementById("word").innerHTML = game.getHiddendWord(); 
	document.getElementById("guesses").innerHTML = "";
	game.getPossibleGuesses().forEach( function(guess) {
		let innerHtml = "<span class='guess'>" + guess + "</span>";
		document.getElementById("guesses").innerHTML += innerHtml;
	});

	let winLose = document.getElementById('winLose');
	if( game.isWon() )
	{
		winLose.value = youWon;
		winLose.innerText = "win";
	}
	else if( game.isLost() )
	{
		winLose.value = youLost;
		winLose.innerText = "loss";
	}
	else
	{
		winLose.value = "";
		winLose.innerText = "";
	}
}

//code for starting a new game

function newGame()
{
	history.go(0)
}

let game = new Game();
render( game );
listenForInput( game );

