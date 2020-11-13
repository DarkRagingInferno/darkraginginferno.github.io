window.onload = () => {
    console.log('RELOADED')
}


const createEntry = (word, def) => 
{
    let req = fetch('https://dictionary-jvbp.herokuapp.com/api/definition/new-word',
    {
        method: 'POST',
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify
        ({
            "word": word,
            "definition": def
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error('Error', err))
    });
    console.log(req)
    return req
}

const getWord = (word) =>
{
    let foundWord = fetch(`https://dictionary-jvbp.herokuapp.com/api/definition?word=${word}`);
    console.log(foundWord)
}

const submit = () =>
{
   let query =  document.getElementById('search-word').value
   getWord(query)
}

const goToIndex = () => {
    console.log("I should change to index")

    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/index.html"
}

const goToSearch = () => {
    console.log("I should change to search")
    window.location.href="https://darkraginginferno.github.io/COMP4537/labs/5/dictionary/search.html"
}
