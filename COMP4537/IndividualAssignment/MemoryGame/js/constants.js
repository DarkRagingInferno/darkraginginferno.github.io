const WIN   = 'correct';
const LOSS  = 'wrong';
const BLUE  = "blue";
const RED   = "red";
const WHITE = "white";


const winOutputs = [
    "Now we're cooking with gas!",
    "See I knew you could do it!",
    "Smartest in the world! (Don't quote me on this.)",
    "If only you could see the spaghetti-- I mean good job!",
    "WORLD CHAMPION!",
    "I knew only you could do this!",
    "The CHOSEN ONE is upon us!",
    "Did you know you're the best? Well now you do.",
    "You're the best, AROUND!",
    "Don't be distracted from the fact Halloween decorations are here."
]

const loseOutputs = [
    "Cmon, you know you're better than that.",
    "And just like that the world as we know ended.",
    "I was wrong to entrust you this task.",
    "A Fifth Grader could have done this.",
    "You are not smarter than a Fourth Grader.",
    "Don't worry a blind monkey did just as well.",
    "We can't all be winners.",
    "Tried your best did you....",
    "We're both disappointed.",
    "I expected better..."
]

/**
 * 
 * @param {*} winLossString 
 */
function gameOutput(winLossString) 
{
    let index = Math.floor(Math.random() * winOutputs.length);
    
    if (winLossString == WIN) return winOutputs[index];
    else return loseOutputs[index];
}