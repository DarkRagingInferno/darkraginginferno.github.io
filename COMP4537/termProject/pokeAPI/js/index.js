// https://pokeapi-amar-john.herokuapp.com/

const getStartedOnClick = (username, password) => 
{

}

const authfetch = (username, password) => 
{
    let user = fetch("https://pokeapi-amar-john.herokuapp.com/login", 
        {
            method: 'POST',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                "email": name,
                "score": userScore.toString()
            })
        })
        .then(response => response.json())
        .then(data => 
        {
            createLeaderboardScreen(data, name, userScore);
        })
        .catch((error) => 
        {
            console.error('Error:', error)
        });
    console.log(answer);
    return user;
}