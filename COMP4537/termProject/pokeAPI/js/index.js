// https://pokeapi-amar-john.herokuapp.com/



const authfetch = (email, password) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/login", 
        {
            method: 'GET',
            mode: 'cors',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "email": email,
                "password": password
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            window.localStorage.setItem("token", data.token)
            console.log(window.localStorage.getItem("token"))
            window.location.href = "index1.html";

        })
        .catch((error) => 
        {
            alert(error +  " Invalid Login");
        });
}

const createfetch = (firstName, lastName, password, email, userName) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/trainer/create", 
        {
            method: 'POST',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "email": email,
                "userName": userName
            })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            window.localStorage.setItem("token", data.token)
            console.log(window.localStorage.getItem("token"))
            window.location.href = "index1.html";
        })
        .catch((error) => 
        {
            alert(error +  " User Already Exists");
        });
}


const getTrainer = () => 
{
    toggle_visibility('myTrainer')
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/trainer", 
        {
            method: 'GET',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            let trainer = data.trainer
            document.getElementById("trainerName").innerHTML = trainer.firstName +" " + trainer.lastName
            document.getElementById("trainerEmail").innerHTML = trainer.email
            document.getElementById("trainerUserName").innerHTML = "Username: " + trainer.username 
            document.getElementById("trainerId").innerHTML = "ID: " + trainer.trainerId
            document.getElementById("trainerParty").innerHTML = "Party: " + trainer.party_partyId
            if(trainer.trainer_image != null){
                document.getElementById("trainerImg").src = trainer.trainer_image
            }
            console.log(data)
        })
        .catch((error) => 
        {
            alert(error +  " Failed To Get Trainer");
        });
}

const createParty = () => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/party/create", 
        {
            method: 'GET',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("trainerParty").innerHTML = "Party: " + data.partyId
            console.log(data)
        })
        .catch((error) => 
        {
            alert(error +  " Party Already Exists!");
        });
}

const updateImage = (img) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/trainer/image", 
        {
            method: 'POST',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "image": img
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("trainerImg").src = data.image
            console.log(data)
        })
        .catch((error) => 
        {
            alert(error +  "Failed to upload image");
        });
}

const getParty = () => 
{
    toggle_visibility('getParty')
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/party", 
        {
            method: 'GET',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            let x = document.getElementById("partyMessage");
            x.innerHTML=""
            for (let i=0; i < data.length; i++){
                x.innerHTML += i + 1 + ". Pokemon " + data[i].pokeNo + '<br><br>'
            }
        })
        .catch((error) => 
        {
            document.getElementById("partyMessage").innerHTML = error + "Empty or No Such Party"
        });
}

const addParty = (pokeNo) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/party/add", 
        {
            method: 'PUT',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "pokeNo": pokeNo
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            let x = document.getElementById("partyMessage");
            x.innerHTML=""
            for (let i=0; i < data.length; i++){
                x.innerHTML += i + 1 + ". Pokemon " + data[i].pokeNo + '<br><br>'
            }
        })
        .catch((error) => 
        {
            alert(error + " Pokemon Doesn't Exist or Limit of 6 Exceeded")
        });
}

const deleteParty = (pokeNo) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/party/delete", 
        {
            method: 'DELETE',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "pokeNo": pokeNo
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            let x = document.getElementById("partyMessage");
            x.innerHTML=""
            for (let i=0; i < data.length; i++){
                x.innerHTML += i + 1 + ". Pokemon " + data[i].pokeNo + '<br><br>'
            }
        })
        .catch((error) => 
        {
            alert(error + " Pokemon Doesn't Exist In Party")
        });
}


const getPokemon = (pokeNo) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/pokemon", 
        {
            method: 'GET',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token"),
                "pokeno": pokeNo
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("pokeNo").innerHTML = ""
            document.getElementById("pokename").innerHTML = ""
            document.getElementById("type1").innerHTML = ""
            document.getElementById("type2").innerHTML = ""
            document.getElementById("total").innerHTML = ""
            document.getElementById("hp").innerHTML = ""
            document.getElementById("attack").innerHTML = ""
            document.getElementById("defense").innerHTML = ""
            document.getElementById("spec_atk").innerHTML = ""
            document.getElementById("spec_def").innerHTML = ""
            document.getElementById("speed").innerHTML = ""
            document.getElementById("generation").innerHTML = ""
            document.getElementById("legendary").innerHTML = ""
            document.getElementById("pokeimg").src = ""
            let pokemon = data.pokemon
            document.getElementById("pokeNo").innerHTML = "Number: " + pokemon.pokeNo
            document.getElementById("pokename").innerHTML = "Name: " + pokemon.name
            document.getElementById("type1").innerHTML = "Type 1: " + pokemon.type1
            document.getElementById("type2").innerHTML = "Type 2: " + pokemon.type2
            document.getElementById("total").innerHTML = "Total: " + pokemon.total
            document.getElementById("hp").innerHTML = "HP: " + pokemon.hp
            document.getElementById("attack").innerHTML = "Attack: " + pokemon.attack
            document.getElementById("defense").innerHTML = "Defense: " + pokemon.defense
            document.getElementById("spec_atk").innerHTML = "Special Attack: " + pokemon.spec_atk
            document.getElementById("spec_def").innerHTML = "Special Defense: " + pokemon.spec_def
            document.getElementById("speed").innerHTML = "Speed: " + pokemon.speed
            document.getElementById("generation").innerHTML = "Generation: " + pokemon.generation
            document.getElementById("legendary").innerHTML = "Legendary: " + pokemon.legendary
            document.getElementById("pokeimg").src = pokemon.image


            
        })
        .catch((error) => 
        {
            alert(error + "No such pokemon exists!")
        });
}


const updateTrainer = (firstName, lastName, email) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/trainer/update", 
        {
            method: 'PUT',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("status").innerHTML = data.trainer.message
        })
        .catch((error) => 
        {
            document.getElementById("status").innerHTML = "Failed to Update Trainer, check if existing email entered is correct"
        });
}

const deleteTrainer = () => 
{
    var r = confirm("Are you sure you wish to delete this account?");
    if (r == true) {
        fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/trainer/delete", 
        {
            method: 'DELETE',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            localStorage.clear();
            window.location.href = "index.html";
        })
        .catch((error) => 
        {
            alert(error + " Failed to delete account.")
        });
    } else {
    }
    
}


const createPokemon = (pokeNo, name, type1, type2, total, hp, attack, defense, spec_atk, spec_def, speed, generation, legendary) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/pokemon/create", 
        {
            method: 'POST',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "pokeNo": pokeNo,
                    "name": name,
                    "type1": type1,
                    "type2": type2,
                    "total": total,
                    "hp": hp,
                    "attack": attack,
                    "defense": defense,
                    "spec_atk": spec_atk,
                    "spec_def": spec_def,
                    "speed": speed,
                    "generation": generation,
                    "legendary": legendary
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("status1").innerHTML = "Successfully Created Pokemon"
        })
        .catch((error) => 
        {
            alert(error + " Failed Creating Pokemon")
        });
}

const updatePokemon = (pokeNo, name, type1, type2, total, hp, attack, defense, spec_atk, spec_def, speed, generation, legendary) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/pokemon/update", 
        {
            method: 'PUT',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "pokeNo": pokeNo,
                    "name": name,
                    "type1": type1,
                    "type2": type2,
                    "total": total,
                    "hp": hp,
                    "attack": attack,
                    "defense": defense,
                    "spec_atk": spec_atk,
                    "spec_def": spec_def,
                    "speed": speed,
                    "generation": generation,
                    "legendary": legendary
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("status1").innerHTML = data.trainer.message
        })
        .catch((error) => 
        {
            alert(error + " Failed Updating Pokemon")
        });
}

const deletePokemon = (pokeNo) => 
{
    fetch("https://pokeapi-amar-john.herokuapp.com/api/v1/pokemon/delete", 
        {
            method: 'DELETE',
            headers: 
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "JWT " + window.localStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    "pokeNo": pokeNo
                })
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else
            {
                throw new Error(response.status)
            }
        })
        .then(data => 
        {
            document.getElementById("status1").innerHTML = data.deletedPokemon.message
        })
        .catch((error) => 
        {
            alert(error + " Failed Deleting Pokemon")
        });
}



function toggle_visibility(id) {

    document.getElementById('createPokemon').style.display = "none"
    document.getElementById('deleteTrainer').style.display = "none"
    document.getElementById('updateTrainer').style.display = "none"
    document.getElementById('pokemon').style.display = "none"
    document.getElementById('myTrainer').style.display = "none"
    document.getElementById('getParty').style.display = "none"
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}


function myFunction() {
    var x = document.getElementById("create");
    var y = document.getElementById("login");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    if (y.style.display === "none") {
        y.style.display = "block";
      } else {
        y.style.display = "none";
      }
  }

  function logout() {
    localStorage.clear();
    window.location.href = "index.html";
  }

