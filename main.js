//array of all available words to guess from

const wordBank = [
'snarl', 'dominate', 'retailer', 'prejudice', 'integration',
'separation', 'tradition', 'ghostwriter', 'section', 'decay',
'convention', 'admission', 'diagram', 'ecstasy', 'activity',
'medieval', 'brainstorm', 'portrait', 'moving', 'modernize',
'dedicate', 'plagiarize', 'underline', 'consensus', 'litigation',
'deteriorate', 'jazz', 'azure', 'pneumonia', 'wheezy',
'rickshaw', 'jukebox', 'khaki', 'flyby', 'zombie',
'vodka', 'larynx', 'espionage', 'mnemonic', 'pizza',
'hamburger', 'jaywalk', 'uncle', 'freshman', 'continental',
'marathon', 'unlike', 'compose', 'sunshine', 'figure',
'advance', 'translate', 'angel', 'potential', 'question',
'abolish', 'daughter', 'multiply', 'panic', 'attack',
'future' , 'divide', 'friend', 'doctor', 'testament'
]


//setting up our game function and the parameters for winning and losing

const youWon = ""
const youLost = ""

function Game() {

    //code used to grab a random word from the wordBank array

    let word = wordBank[Math.floor(Math.random() * wordBank.length)];
    word = word.toUpperCase();

    //declaring variables that will be used throughout the code
    let guessedLetters = [];
    let hiddenWord = "";
    let wrongGuesses = 0;
    let possibleGuesses = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let won = false;
    let lost = false;
    const maxGuesses = 8;

	//code for placing an underscore for each letter in the hidden word. if there are spaces then it would leave it as a space

    for (let i = 0; i < word.length; i++) {
        let space = " ";
        let nextLetter = word.charAt(i) === space ? space : '_';
        hiddenWord += nextLetter;
    }

	//function used to push in correct letter guesses to their respective locations

    let guess = function(letter) {
        letter = letter.toUpperCase();

		//once we click a letter it gets pushed out of our possible guesses. that way we can't click them again.

        if( !guessedLetters.includes( letter)) {
            guessedLetters.push(letter);
            possibleGuesses = possibleGuesses.replace(letter, "");

			//comparing our picked word to our guess. if it's in the picked word then we push it in to our word at the correct index.

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

				//checking if we met out win condition by seeing if our guessed letters equals our initial picked word

                if( !lost) {
                    won = hiddenWord === word;
                }
            }

			//if our guess is not in the picked word then execute the wrongGuess function

            else {
                wrongGuess();
            }
        }
    }

	//as long as the amount of guesses is less than the amount of max guess then we will add a counter to wrong guesses and continue to play the game

    let wrongGuess = function() {
        wrongGuesses++;
        lost = wrongGuesses >= maxGuesses;
		document.getElementById("currentGuess").innerText = `guess: ${wrongGuesses} of ${maxGuesses}`;		
		
		//throws the correct word into the intro string if the user failed to guess the picked word.
		
		if (lost) {
			document.getElementById("intro").innerText = `the correct word was ${word}`;
		}
    }

	//ending our function execution and returning our values to the function callers.
	
    return {
		"getHiddendWord": function(){ return hiddenWord; },
		"guess": guess,
		"getPossibleGuesses": function(){ return [... possibleGuesses]; },
		"getWrongGuesses": function(){ return wrongGuesses; },
		"isWon": function(){ return won; },
		"isLost": function(){ return lost; },
    }

	
}

//function for moving correctly guessed letters into the correct index of our hidden word.

function replace( value, index, replacement ) 
{
    return value.substr(0, index) + replacement + value.substr(index + replacement.length);	
}

//logic to keep the game moving along if it's neither won or lost

function listenForInput( game ) {
	let guessLetter = function( letter )
	{
		if( letter )
		{
			//replacing the text of the intro statement while the game is still going on.

			document.getElementById("intro").innerText = "";
			let gameStillGoing = !game.isWon() && 
								 !game.isLost();
			if( gameStillGoing ) {
			
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

//code for launching/looping the game and setting up our win/lose outputs.

function render( game )
{
	//grabbing our html elements
	
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
		winLose.innerText = "you won! :D";
		document.getElementById("spaceDude").innerHTML = "<img src = ./spacemanWon.png>";
	}
	else if( game.isLost() )
	{
		winLose.value = youLost;
		winLose.innerText = "you lose. :(";
		document.getElementById("alien").innerHTML = "<img src = ./alienProbe.png>";
	}
	else
	{
		winLose.value = "";
		winLose.innerText = "";
	}
}

//code for calling a new game and resetting all parameters.

function newGame()
{
	history.go(0)
}

//executing all of the code for game

let game = new Game();
render( game );
listenForInput( game );

