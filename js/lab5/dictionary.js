// window.onload = () => {
//     console.log('RELOADED')
// }


const createEntry = (word, def) => 
{
    console.log('Entering CREATE ENTRY');
    console.log(word, def);
    
    let req = fetch('https://dictionary-jvbp.herokuapp.com/api/definitions/new-word',
    {
        method: 'POST',
        headers: 
        {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {
            "word": word,
            "definition": def
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error', err))
    
    return req;
}

const getWord = async (word) =>
{
    console.log('Entering GET WORD')
    let foundWord = await fetch(`https://dictionary-jvbp.herokuapp.com/api/definitions?word=${word}`);
    let foundWordText = await foundWord.json();
    appendDef(word, foundWordText);
    
}

const submit = () =>
{
    console.log('Submitting SEARCH WORD');
   let query =  document.getElementById('search-word').value;
   getWord(query);
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
    console.log(jObj)

}