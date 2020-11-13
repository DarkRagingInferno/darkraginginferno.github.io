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
    
    console.log(req)
    return req
}

const getWord = async (word) =>
{
    console.log('Entering GET WORD')
    let foundWord = await fetch(`https://dictionary-jvbp.herokuapp.com/api/definitions?word=${word}`);
    // let foundWord = fetch(`localhost:3000/api/definitions?word=${word}`);
    let foundWordText = await foundWord.json()
    console.log(foundWordText);
}

const submit = () =>
{
    console.log('Submitting SEARCH WORD')
   let query =  document.getElementById('search-word').value
   getWord(query)
}

const goToIndex = () => {
    console.log("I should change to index")

    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/index.html"
    // window.location.href="../../COMP4537/labs/5/dictionary/index.html"
}

const goToSearch = () => {
    console.log("I should change to search")
    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/search.html"
    // window.location.href="../../COMP4537/labs/5/dictionary/search.html"
}
// 