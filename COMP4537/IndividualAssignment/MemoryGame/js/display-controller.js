

var blockArr    = [];
var answerTiles = [];
var rotated = false;
var degree;

function getBlocks() 
{
    let blocks = document.body.getElementsByClassName('block');
    let arr    = Array.from(blocks)
    blockArr   = arr;
}

function checkColor(self) {
    if(self.style.backgroundColor == 'blue') return true;
    else false;
}

function colorBlue(self)
{
    self.style.backgroundColor = 'blue';
}

function colorRed(self)
{
    self.style.backgroundColor = 'red';
}


function colorWhite() {
    // console.log('FLASHING YOU AGAIN')
    // console.log('WHITE BOY')
    // console.log(answerTiles)
    answerTiles.forEach( el => { el.style.backgroundColor = 'white'; })
}

function targetTiles(numTiles) 
{   
    console.log('Grabbing tiles')
    let selectedRandomTiles = getRandomBlocks(numTiles, blockArr);
    selectedRandomTiles.forEach( el => { colorBlue(el) } )
    answerTiles = selectedRandomTiles;
}

function getRandomBlocks(randomCount, arrayOfBlocks) 
{
    let randomSelections = new Set();
    let i = 0;
    while (i < randomCount)
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

function deleteGrid() 
{
    let grid   = document.getElementById('grid');
    grid.parentNode.removeChild(grid);
    console.log('Deleted the grid');
}

function deleteLoseDiv() 
{
    let loseDiv = document.getElementById('lose-div');
    loseDiv.parentNode.removeChild(loseDiv);
    console.log('Deleted the loss Div');
}

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

    let restartBTN = document.createElement('input');
    restartBTN.setAttribute('id', 'restart');
    restartBTN.setAttribute('type', 'submit');
    restartBTN.setAttribute('value', 'Restart?');
    restartBTN.setAttribute('onclick', 'restartGame()');

    lostDiv.appendChild(para)
    lostDiv.appendChild(restartBTN);
    gridContainer.appendChild(lostDiv);
}

function createTerminateBTN() 
{
    let gridContainer = document.getElementById('container');
    let terminateBTN  = document.createElement('input');
    // button.style.cssText = "id: terminate; type: submit; value: Terminate; onclick: terminate()";
    terminateBTN.setAttribute('id', 'terminate');
    terminateBTN.setAttribute('type', 'submit');
    terminateBTN.setAttribute('value', 'Terminate');
    terminateBTN.setAttribute('onclick', 'terminate()');
    gridContainer.appendChild(terminateBTN);
}

function getAnswerTiles() 
{
    return answerTiles;
}

function setScore(newScore) 
{
    let scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = newScore;
}

function getOutput(result)
{
    let output = document.getElementById('output');
    if (result == WIN )
        output.innerHTML = gameOutput(WIN)
    else output.innerHTML = gameOutput(LOSS)
}

function removeOutput() 
{
    let output = document.getElementById('output');
    output.innerHTML = '';
}

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
            block.style .oTransform      = 'rotateY('+angle+'deg)'; 
            block.style.transform       = 'rotateY('+angle+'deg)'; 
        }
        block.style.backgroundColor = 'blue';
        angle = 0;
    }

}

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


    