var windoWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var width = 0;
var height = 0;
// var screenWidthPerc = 0.11;
// var screenHeightPerc = 0.055;
var mobileDimension = 45;

function createGame(row, col) 
{   
    setBlockDimensions(windoWidth, windowHeight)
    setGame(row, col);
}

 function setGame(row, col) 
 {
    createGrid();
    createRows(row);
    createColumn(col);
 }

function createGrid() 
{
    let gridContainer = document.getElementById('grid-container');
    let div = document.createElement('div');
    div.setAttribute('id', 'grid');
    div.setAttribute('class', 'grid');
    gridContainer.appendChild(div);
}

function createRows(numRows) 
{
    if(numRows == -1) return console.log(`I came back ${numRows}`); 
    
    let grid = document.getElementById('grid');
    let div  = document.createElement('div');
    div.setAttribute('class', 'row');
    // div.innerHTML = 'Row was created';
    grid.appendChild(div);

    // console.log(`Created ${numRows} rows`);
    
    return createRows(numRows - 1);
}

function createColumn(numCol) 
{    
    if(numCol == -1) return;

    let gridRows = Array.from(document.getElementsByClassName('row'));
    for (row of gridRows) 
    {
        let div  = document.createElement('div');

        div.setAttribute('class', 'col block');
        div.setAttribute('onclick', 'colorTile(this)');
        div.style.cssText = `width: ${width}px; height: ${height}px`
        // div.innerHTML = 'This is a col';
        row.appendChild(div)
        // console.log('Created row');
    }
    return createColumn(numCol - 1);
}

function setBlockDimensions(windowWidth, windowHeight) 
{
    console.log('hello')
    let adjustedWidth = Math.floor(mobileDimension / windowWidth)
    let adjustedHeight = Math.floor(mobileDimension / windowHeight)

    width = windowHeight * adjustedWidth;
    height = windowHeight * adjustedHeight;
    
    console.log(adjustedWidth, adjustedHeight);
    console.log(width, height);
    console.log(windoWidth, windowHeight)
}



