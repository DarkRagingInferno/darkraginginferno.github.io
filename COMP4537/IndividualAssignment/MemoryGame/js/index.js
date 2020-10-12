/**
 * This JS file does all the logic for creating the grid of the game. It creates
 * the game sets the grid, rows, and columns
 *
 * @author John Poku
 * @since  09.15.2020
 */

var windoWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var height          = 0;
var width           = 0;
var mobileDimension = 45;

/**
* This function creates the game.
* @param {Int} row  The number of rows in the grid.
* @param {col} col  The number of columns in the grid.    
*/
function createGame(row, col) 
{   
    setBlockDimensions(windoWidth, windowHeight)
    setGame(row, col);
}

/**
* This function sets the game 
* @param {Int} row  The number of rows in the grid.
* @param {col} col  The number of columns in the grid.    
*/
 function setGame(row, col) 
 {
    createGrid();
    createRows(row);
    createColumn(col);
 }


/** 
* This function creates the grid. 
*/
function createGrid() 
{
    let gridContainer = document.getElementById('grid-container');
    let div = document.createElement('div');
    div.setAttribute('id', 'grid');
    div.setAttribute('class', 'grid');
    gridContainer.appendChild(div);
}

/**
* This function creates the rows for the grid.
* @param {Int} numRow  The number of rows in the grid.  
*/
function createRows(numRows) 
{
    if(numRows == -1) return console.log(`I came back ${numRows}`); 
    
    let grid = document.getElementById('grid');
    let div  = document.createElement('div');
    div.setAttribute('class', 'row');
    grid.appendChild(div);
    
    return createRows(numRows - 1);
}

/**
* This function creates the columns in the rows.
* @param {Int} numCol  The number of columns in the grid.  
*/
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
        row.appendChild(div)
    }
    return createColumn(numCol - 1);
}

/**8
* This function sets the dimensions of the columns (blocks)
* @param {Int} windowWidth The width of the current window.
* @param {Int} windowHeight The height of the current window.
*/
function setBlockDimensions(windowWidth, windowHeight) 
{
    let adjustedWidth  = mobileDimension / windowWidth;
    let adjustedHeight = mobileDimension / windowHeight;

    width  = Math.floor(windowWidth * adjustedWidth);
    height = Math.floor(windowHeight * adjustedHeight);
}



