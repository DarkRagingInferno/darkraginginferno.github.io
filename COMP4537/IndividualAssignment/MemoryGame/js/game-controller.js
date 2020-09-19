var timer        = null;
var whitFlash    = null;
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


window.onload = () => {
    createGame(rowCount, colCount);
    getBlocks();
    flashCorrectTiles(tileCount);
    setTimeout(() => { correctTiles = getAnswerTiles() }, 3700);
}

function newGame() 
{
    removeOutput(); 
    deleteGrid();
    createGame(rowCount, colCount);
    getBlocks();
    flashCorrectTiles(tileCount);    
    console.log('Created new game');
}

function restartGame() {
    score = 0;
    resetGame()
    deleteLoseDiv();
    setScore(score);
    createGame(rowCount, colCount);
    createTerminateBTN();
    getBlocks();
    flashCorrectTiles(tileCount);   
    
    console.log('Restarted Game');
}

function terminate()
{ 
    deleteGrid();
    createLoseScreen();
    clearTimeout(timer);
    clearTimeout(whiteFlash);

    console.log('Terminated the game');
}

function flashCorrectTiles(tiles) 
{
    // console.log('I AM FLASHING YOU!');
    threeSecCountDown(tiles)
    
    whiteFlash = setTimeout(() => {colorWhite(); 
                                    setTimeout(() => {animationRotate();} , 1000);
                                    canClick = false; 
                                    if (colCount == 6 && kingOfGames != 0) setTimeout(() => {secondRotate();} , 2000); 
                                    else kingOfGames = 0;}
                                    , 3500);
    setTimeout(() => {clearTimeout; clearTimeout; correctTiles = getAnswerTiles(); canClick = true; console.log('OKAY now you can click')}, 5000, whiteFlash, rotate);
}

function threeSecCountDown(tiles) 
{
    // console.log("3, 2, 1, GO!");
    timer = setTimeout(targetTiles, 2000, tiles);
    setTimeout(clearTimeout, 2100, timer);
}

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
            output = 'correct';
        }
        else 
        {
            colorRed(self);
            score--;
            clickCounter++;
            output = 'wrong';
        }
        setScore(score);
        
        setTimeout(isLastClick, 1500);
        if(score < 0) terminate();       
    }
    else return;
}

function isLastClick(){
    if(clickCounter === maxClicks) evaluateGame();
    else return;
}

function evaluateGame() 
{
    canClick       = false;
    let tiles      = Array.from(correctTiles);
    let perfectRun = true;

    tiles.forEach(el => {
        if(el.style.backgroundColor != 'blue') perfectRun = false;
    });

    if (!perfectRun) animationFlip();

    if(perfectRun) 
    {
        console.log(rowCount, colCount)
        if (colCount === 6)
        {
            getOutput('correct');
            kingOfGames++;
            clickCounter = 0;
            tileCount = 10;
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
        else 
        {
            getOutput('correct');
            increaseGrid(rowCount, colCount);
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
    }
    else
    {
        if(rowCount === 1) 
        {
            getOutput('wrong');
            resetGame()
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame); 
        }
        else 
        {
            getOutput('wrong');
            decreaseGrid(rowCount, colCount);
            let startNewGame = setTimeout(newGame, 1500, rowCount, colCount);
            setTimeout(clearTimeout, 1600, startNewGame);
        }
    } 
}

function increaseGrid(row, col) 
{
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

function decreaseGrid(row, col)
{
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

function checkCorrect(self) 
{
    if(correctTiles.has(self)) return true; return false;
}

function resetGame()
{
    rowCount = 1;
    colCount = 1;
    tileCount = 2; 
    clickCounter = 0;
    maxClicks = 2; 
    canClick = false;
}



