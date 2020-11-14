
const createEntry = () => 
{
    let word = document.getElementById("word").value
    let def = document.getElementById("definition").value;
    let myWord  = word.trim() 
    let is_word = Array.from(myWord).reduce((acc, char) => acc && (char.toUpperCase() != char.toLowerCase()), true);
    if(!is_word || word.length < 1 || def.length < 1)
        {
            alert("Please Enter A Word and A Definition Without Any Numbers or Symbols");
            return;
        }

    fetch('https://dictionary-jvbp.herokuapp.com/api/definitions/new-word',
    {
        method: 'POST',
        headers: 
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
        {
            "word": myWord,
            "definition": def
        })
    })
    .then(response => {
        console.log(response)
        if(response.status == 200)
        {
            alert("Code: 200: SUCCESS!");
        }
        else
        {
            alert(response.status, ": FAIL");
        }
    })
    .catch(err => console.error('Error', err))
}

const getWord = async (word) =>
{
    let foundWord = await fetch(`https://dictionary-jvbp.herokuapp.com/api/definitions?word=${word}`).catch(err => console.log(err))
    if(foundWord.status == 200){
        let foundWordText = await foundWord.json()
        appendDef(word, foundWordText);
    }
    else {
        appendError(word)
    }
    
    
}

const submit = () =>
{
    console.log('Submitting SEARCH WORD');
    let query =  document.getElementById('search-word').value;
    if (query.length > 0) {
        getWord(query);
    }
    else {
        alert("Please Enter a Word!")
    }
   
     
}

const goToIndex = () => {
    console.log("I should change to index")

    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/index.html"
}

const goToSearch = () => {
    console.log("I should change to search")
    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/search.html"
}

const appendDef = (word, jObj) => {

    let termDiv = document.getElementById('term');
    let defDiv  = document.getElementById('definition');

    termDiv.innerHTML = word;
    defDiv.innerHTML = jObj['k'];

}

const appendError = (word) => {

    let termDiv = document.getElementById('term');
    let defDiv  = document.getElementById('definition');
    termDiv.innerHTML = word;
    defDiv.innerHTML = "No such word found";

}