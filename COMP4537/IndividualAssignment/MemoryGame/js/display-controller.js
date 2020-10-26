/**
 * This JS File has all the logic and functions for changing and managing the 
 * display of the game.
 * @author John Poku
 * @since  09.15.2020
 */

var blockArr    = [];
var answerTiles = [];
var rotated     = false;
var degree;

/**
 * This function gets all the blocks (columns) in the grid of the game.
 */
function getBlocks() 
{
    let blocks = document.body.getElementsByClassName('block');
    let arr    = Array.from(blocks)
    blockArr   = arr;
}

/**
 * This function takes in a javascript object and checks if it's color is blue.
 * @param {javascript object} self The javascript object to be checked.
 */
function checkColor(self) {
    if(self.style.backgroundColor == BLUE) return true;
    else false;
}

/**
 * This function takes in a javascript object and turns it's background color 
 * blue.
 * @param {javascript object} self 
 */
function colorBlue(self)
{
    self.style.backgroundColor = BLUE;
}

/**
 * This function takes in a javascript object and turns it's background color 
 * red.
 * @param {javscript object} self 
 */
function colorRed(self)
{
    self.style.backgroundColor = RED;
}

/**
 * This function takes all selected correct tiles and turns them white.
 */
function colorWhite() {
    // console.log('FLASHING YOU AGAIN')
    // console.log('WHITE BOY')
    // console.log(answerTiles)
    answerTiles.forEach( el => { el.style.backgroundColor = WHITE; })
}

/**
 * This function gets all the blocks (columns) in the grid and returns a Set of 
 * randomly selected tiles (correct tiles).
 * @param {Int} numTiles 
 */
function targetTiles(numTiles) 
{   
    let selectedRandomTiles = getRandomBlocks(numTiles, blockArr);
    selectedRandomTiles.forEach( el => { colorBlue(el) } )
    answerTiles = selectedRandomTiles;
}

/**
 * 
 * @param {Int} numTiles The number of tiles to be selected .
 * @param {*} arrayOfBlocks An array of javascript objects (columns/blocks).
 */
function getRandomBlocks(numTiles, arrayOfBlocks) 
{
    let randomSelections = new Set();
    let i = 0;
    while (i < numTiles)
    {
        let randomSelection = blockArr[Math.floor(Math.random() * arrayOfBlocks.length)];
        if (!randomSelections.has(randomSelection)) 
        {
            randomSelections.add(randomSelection);
            i++;
        }
    }
    return randomSelections;
}

/**
 * This function deletes the grid and all its children.
 */
function deleteGrid() 
{
    let grid   = document.getElementById('grid');
    grid.parentNode.removeChild(grid);
}

/**
 * This function deletes the loss div or loss screen that is displayed when a 
 * user loses.
 */
function deleteLoseDiv() 
{
    let loseDiv = document.getElementById('lose-div');
    if (loseDiv.childElementCount == null)
        loseDiv.parentNode.removeChild(loseDiv);
}

/**
 * This function creates a loss screen to display to the user.
 */
function createLoseScreen() 
{
    let gridContainer = document.getElementById('grid-container');
    let terminateBTN  = document.getElementById('terminate');
    terminateBTN.parentNode.removeChild(terminateBTN)
    
    let lostDiv    = document.createElement('div');
    lostDiv.setAttribute('id', 'lose-div');
    
    let para       = document.createElement('p');
    para.setAttribute('class', 'losing-para');
    para.innerHTML = "You're better than that!";

    let restartBTN = createRestartBTN() 

    let textField  = document.createElement('input');
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'Enter Name');
    textField.setAttribute('id', 'textfield');

    let submitBTN  = createSubmitBTN()

    lostDiv.append(textField);
    lostDiv.appendChild(submitBTN);
    lostDiv.appendChild(para);
    lostDiv.appendChild(restartBTN);
    gridContainer.appendChild(lostDiv);
}

function createLeaderboardScreen()
{
    let container = document.getElementById('leadboard-container');

    let restartBTN = createRestartBTN(); 

    container.appendChild(restartBTN);
}

/**
 * This function creates a terminate button.
 */
function createRestartBTN() 
{
    let restartBTN = document.createElement('input');
    restartBTN.setAttribute('id', 'restart');
    restartBTN.setAttribute('type', 'submit');
    restartBTN.setAttribute('value', 'Restart?');
    restartBTN.setAttribute('onclick', 'restartGame()');
    
    return restartBTN
}

/**
 * This function creates a terminate button.
 */
function createTerminateBTN() 
{
    let gridContainer = document.getElementById('container');
    let terminateBTN  = document.createElement('input');
    terminateBTN.setAttribute('id', 'terminate');
    terminateBTN.setAttribute('type', 'submit');
    terminateBTN.setAttribute('value', 'Terminate');
    terminateBTN.setAttribute('onclick', 'terminate()');
    gridContainer.appendChild(terminateBTN);
}

function createSubmitBTN()
{
    let submitBTN  = document.createElement('input');
    submitBTN.setAttribute('id', 'submit');
    submitBTN.setAttribute('type', 'button');
    submitBTN.setAttribute('value', 'Submit Game');
    submitBTN.setAttribute('onclick', 'submitGame()');
    // submitBTN.setAttribute('href', '../html/leaderboard.html')

    return submitBTN
}

/**
 * This function returns the answer tiles (correct tiles).
 */
function getAnswerTiles() 
{
    return answerTiles;
}

/**
 * This function takes in a new score and sets the score displayed on the screen.
 * @param {Int} newScore The new score.
 */
function setScore(newScore) 
{
    let scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = newScore;
}

/**
 * This function takes in a result 
 * @param {String} result The constant string.
 */
function getOutput(result)
{
    let output = document.getElementById('output');
    if (result == WIN )
        output.innerHTML  = gameOutput(WIN)
    else output.innerHTML = gameOutput(LOSS)
}

/**
 * This function removes the out from the output div and replaces it with an
 * empty string.
 */
function removeOutput() 
{
    let output = document.getElementById('output');
    output.innerHTML = '';
}

/**
 * This function rotates the grid.
 */
function animationRotate() {
    let angleArr = [-180, -90, 90, 180];
    let index = Math.floor(Math.random() * angleArr.length);

    let grid = document.getElementById('grid')
    // let angle = degree;

    grid.style.webkitTransform = 'rotate('+angleArr[index]+'deg)'; 
    grid.style.mozTransform    = 'rotate('+angleArr[index]+'deg)'; 
    grid.style.msTransform     = 'rotate('+angleArr[index]+'deg)'; 
    grid.style.oTransform      = 'rotate('+angleArr[index]+'deg)'; 
    grid.style.transform       = 'rotate('+angleArr[index]+'deg)'; 

    degree = angleArr[index]
}

/**
 * this function flips all the correct tiles.
 */
function animationFlip() {
    let arr = answerTiles;
    angle = 0;
    for (block of arr) 
    {
        while(angle < 181)
        {
            ++angle;
            block.style.webkitTransform = 'rotateY('+angle+'deg)'; 
            block.style.mozTransform    = 'rotateY('+angle+'deg)'; 
            block.style.msTransform     = 'rotateY('+angle+'deg)'; 
            block.style .oTransform     = 'rotateY('+angle+'deg)'; 
            block.style.transform       = 'rotateY('+angle+'deg)'; 
        }
        block.style.backgroundColor = BLUE;
        angle = 0;
    }

}

/**
 * This function rotates the grid for second time.
 */
function secondRotate() {
    let angleArr = [-90, 90];
    let index = Math.floor(Math.random() * angleArr.length);
    let newAngle = degree + angleArr[index];
    
    let grid = document.getElementById('grid')

    grid.style.webkitTransform = 'rotate('+newAngle+'deg)'; 
    grid.style.mozTransform    = 'rotate('+newAngle+'deg)'; 
    grid.style.msTransform     = 'rotate('+newAngle+'deg)'; 
    grid.style.oTransform      = 'rotate('+newAngle+'deg)'; 
    grid.style.transform       = 'rotate('+newAngle+'deg)'; 
}


    