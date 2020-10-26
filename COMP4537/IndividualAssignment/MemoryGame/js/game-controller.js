/**
 * This JS File has all the logic and function for managing the state of the 
 * game. It determines when to create a game and when the display of the game
 * should change.
 * @author John Poku
 * @since  09.15.2020
 */

 
var timer        = null;
var whiteFlash   = null;
var rotate       = null;
var canClick     = false;
var maxClicks    = 2; //2
var clickCounter = 0;
var correctTiles = [];
var rowCount     = 1; //1
var colCount     = 1; //1
var tileCount    = 2; //2
var score        = 0;
var kingOfGames  = 0;
var leaderboard  = false;

/**
 *  This anonymous function loads as soon as the window is ready. It creates, sets
 * and begins a memory game.
 */
window.onload = () => {
    if (window.location.href == 'https://darkraginginferno.github.io/COMP4537/IndividualAssignment/MemoryGame/html/leaderboard.html')
    {
        return;
    }
    else 
    {
        console.log('hello there');
        createGame(rowCount, colCount);
        getBlocks();
        flashCorrectTiles(tileCount);
        setTimeout(() => { correctTiles = getAnswerTiles() }, 3700);  
    }
}

/**
 * This function creates a new game.
 */
function newGame() 
{
    removeOutput(); 
    deleteGrid();
    createGame(rowCount, colCount);
    let sound = setTimeout(playSound().play(),0);
    getBlocks();
    flashCorrectTiles(tileCount);
    clearTimeout(sound)    
}

/**
 * This function restarts and creates a new 2x2 game.
 */
function restartGame() {
    score = 0;
    if (!leaderboard) deleteLoseDiv();
    else  deleteLeaderboardDiv()
    resetGame()
    setScore(score);
    createGame(rowCount, colCount);
    createTerminateBTN();
    getBlocks();
    flashCorrectTiles(tileCount);   
}

function submitGame()
{
    leaderboard  = true;
    let node     = document.getElementById('textfield')
    let userName = node.value
    userName.trim();
    if(userName == '') { userName = "John Doe" }

    let userScore = score;
    console.log("About to enter fetchRequest()");
    let response  = fetchRequest(userName, userScore)
    .then(console.log(response))
    .then(window.location.href = "https://darkraginginferno.github.io/COMP4537/IndividualAssignment/MemoryGame/html/leaderboard.html")
    .then(console.log("Rendering leaderboard screen"))
    .then(createLeaderboardScreen(response));
    
}

function fetchRequest(name, userScore) 
{
    console.log("Inside fetchRequest: ");

    let answer = fetch("https://memory-game-jvbp.herokuapp.com/get-scores", 
        {
            method: 'POST',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                "username": name,
                "score": userScore.toString()
            })
        })
        .then(response => response.json())
        .then(data => 
        {
            console.log('Success:', data)
        })
        .catch((error) => 
        {
            console.error('Error:', error)
        });
    console.log("Leaving fetchRequest");
    return answer;
}

/**
 * This function terminates the current game
 */
function terminate()
{     
    deleteGrid();
    createLoseScreen();
    clearTimers()
}

function clearTimers(){
    clearTimeout(timer);
    clearTimeout(whiteFlash);
    clearTimeout(rotate);
}

/**
 * This function mimicks the behaviour of flashing a tile by turning the selected
 * tiles' color white after a set amount of time (3.5 seconds).
 * @param {Int} tiles The number of correct tiles. 
 */
function flashCorrectTiles(tiles) 
{
    // console.log('I AM FLASHING YOU!');
    twoSecCountDown(tiles)
    
    whiteFlash = setTimeout(() => {
                                    colorWhite(); 
                                    setTimeout(() => {animationRotate();} , 1000);
                                    canClick = false; 
                                    if (colCount == 6 && kingOfGames != 0) setTimeout(() => {secondRotate();} , 2000); 
                                    else kingOfGames = 0;
                                }, 3500);
    setTimeout(() => {
                        clearTimeout;
                        clearTimeout; 
                        correctTiles = getAnswerTiles(); 
                        canClick = true; 
                    }, 5000, whiteFlash, rotate);
}

/**
 * This function makes the game wait 2 seconds before executing the function
 * to turn the correct tiles blue to display to the user.
 * @param {Int} tiles The number of correct tiles.
 */
function twoSecCountDown(tiles) 
{
    // console.log("3, 2, 1, GO!");
    timer = setTimeout(targetTiles, 2000, tiles);
    setTimeout(clearTimeout, 2100, timer);
}

/**
 * This function takes in a javascript object and sets it background color to be
 * blue.
 * @param {javascript object} self The object that made the call.
 */
function colorTile(self)
{
    let output = "";
    if(checkColor(self)) return;
    if (canClick && clickCounter < maxClicks)
    {
        if(checkCorrect(self)) 
        {
            colorBlue(self);
            score++;
            clickCounter++;
            output = WIN;
        }
        else 
        {
            colorRed(self);
            score--;
            clickCounter++;
            output = LOSS;
        }
        setScore(score);
        
        setTimeout(isLastClick, 1500);
        if(score < 0) terminate();       
    }
    else return;
}

/**
 * This function checks to see if this click event is the last click of the user
 * in order to determine when to evaluate the game.
 */
function isLastClick(){
    if(clickCounter === maxClicks) evaluateGame();
    else return;
}

/**
 * This function evaluates whether the grid for a newgame should be increased or 
 * decreased basedd on whether they got all the correct tiles or not.
 */
function evaluateGame() 
{
    canClick       = false;
    let tiles      = Array.from(correctTiles);
    let perfectRun = true;

    tiles.forEach(el => {
        if(el.style.backgroundColor != BLUE) perfectRun = false;
    });

    if (!perfectRun) animationFlip();

    if(perfectRun) 
    {
        console.log(rowCount, colCount)
        if (colCount === 6)
        {
            getOutput(WIN);
            kingOfGames++;
            clickCounter = 0;
            tileCount = 10;
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
        else 
        {
            getOutput(WIN);
            increaseGrid(rowCount, colCount);
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
    }
    else
    {
        if(rowCount === 1) 
        {
            getOutput(LOSS);
            resetGame()
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame); 
        }
        else 
        {
            getOutput(LOSS);
            decreaseGrid(rowCount, colCount);
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
    } 
}

/**
 * This function increases the row or the grid counts. It determines which one
 * by comparing the row to the col. 
 * @param {row} row The number of rows in the grid.
 * @param {col} col The number of cols in the grid.
 */
function increaseGrid(row, col) 
{
    // If row is equal to col then increase row else increase col count.
    if(row === col) 
    {
        rowCount++;
        maxClicks++;
        tileCount++;
        clickCounter = 0;
    } 
    else
    {
        colCount++;
        maxClicks++;
        tileCount++;
        clickCounter = 0;
    }
}

/**
 * This function decreases the row or the grid counts. It determines which one
 * by comparing the row to the col. 
 * @param {row} row The number of rows in the grid.
 * @param {col} col The number of cols in the grid.
 */
function decreaseGrid(row, col)
{
    // If row is equal to col then decrease col else increase row count.
    if (row === col)
    {
        colCount--;
        maxClicks--;
        tileCount--;
        clickCounter = 0;
    }
    else
    {
        rowCount--;
        maxClicks--;
        tileCount--;
        clickCounter = 0;
    }
}

/**
 * This function checks if the tile selected is one of the correct tiles. It 
 * checks if a javascript object is in a Set of objects and returns a boolean.
 * @param {javascript object} self 
 */
function checkCorrect(self) 
{
    if(correctTiles.has(self)) return true; return false;
}

/**
 * This function resets the game constants to default values.
 */
function resetGame()
{
    rowCount     = 1;
    colCount     = 1;
    tileCount    = 2; 
    clickCounter = 0;
    maxClicks    = 2; 
    canClick     = false;
    leaderboard  = false;
}

function playSound(){
    let audio = document.getElementById('demon');
    return audio;
}