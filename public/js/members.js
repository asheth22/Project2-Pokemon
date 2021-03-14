 
$(document).ready(() => {
 
  const addCardBtn = $(".addCardBtn");
  const $delCardBtn = $(".delCardBtn");
  const $updateCardBtn = $(".updateCardBtn");
  const $mycards = $(".mycards")
  const $cardsDD = $(".dropdown-item")
  const $nicknameBtn = $(".nicknameUpdate");
  let nicknameEl = $("#nickname")
  let nickname

  let id = 0;
  let userId; 
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    userId = data.id;
    console.log("user data id:", userId)
    getCards(userId);
    
  });

  function loadCards(pokeCards) {
    console.log("pokecards to add: ", pokeCards);
    let $mycards = $(".mycards")
    $mycards.empty();
    // const rowsToAdd = [];
    $mycards.append("<h2> My Cards </h2>")
    
 
    for (let i = 0; i < pokeCards.length; i++) {
      $mycards.append(`<div class="pokecard pokecard${pokeCards[i].energyType}">
      <p>Pokemon Name:${pokeCards[i].pokeName}
      <button type="button" class='btn btn-xs btn-danger dc' id = ${pokeCards[i].id}><i class="fas fa-minus"></i></button></p>
      <p>Nickname: ${pokeCards[i].nickname}</p>
      <p>Card No.: ${pokeCards[i].cardId}</p>
      <p>Attack: ${pokeCards[i].attack}</p>     
      </div>`);
      $mycards.on("click", event => {
        event.preventDefault();    
        console.log("card selected with mycard", event.target)
        console.log("card selected with mycard", event.target.cardId)
        let cardSel = event.target         
        console.log(event.target)
        id = $(cardSel).attr('id')
        console.log("card selected to delete id", id)
        console.log("activated delete card")    
        deleteCard()
        // updateCard()
      });
    
    }
  }
function getCards(userId) {
    console.log("user id is: ", userId)
    const queryUrl = "/api/cards/" + userId;
    console.log("query url: ", queryUrl)
    $.ajax({
      method: "GET",
      url: queryUrl,      
    }).then(data => {     
      console.log(data[0].Pokecharacters);      
      loadCards(data[0].Pokecharacters)
     
    });
  }

  function addCard() {
       
    $.ajax({
      method: "POST",
      url: "/api/addcard/"+ id  
      
    }).then(data => {     
      console.log("Card added", data);
      window.location.reload()
    });

  }
  function updateCard() {    
    const updateURL = "/api/cards/" + id + "/" + nickname
    console.log("Update URL: ", updateURL)
    $.ajax({
      method: "PUT",
      url: updateURL
      
    }).then(data => {     
      console.log("Card updated", data);
      window.location.reload() 
    });
  }

  function deleteCard() {       
    
    $.ajax({
      method: "DELETE",
      url: "/api/cards/" + id 
    }).then(data => {     
      console.log("Card Deleted", data);
      window.location.reload() 
    });
  }

  addCardBtn.on("click", event => {
    event.preventDefault();
    console.log("activated add card", id)
    addCard(); 
  });
  
  function removeCard() {
    $(".delCardBtn").on("click", event => {
      console.log("deleteCard se;ected");
      event.preventDefault();
      let cardSel = event.target
      console.log(event.target)
      id = $(cardSel).attr('id')
      console.log("card selected to delete id", id)
      console.log("activated delete card")
      deleteCard()
    });
  }

  $nicknameBtn.on("click", event => {
    event.preventDefault();
    nickname = nicknameEl.val().trim()
    console.log("activated update card")
    updateCard()
  });


  // $mycards.on("click", event => {
  //   event.preventDefault();    
  //   console.log("card selected with mycard", event.target)
  //   console.log("card selected with mycard", event.target.cardId)
  //   let cardSel = event.target         
  //   console.log(event.target)
  //   id = $(cardSel).attr('id')
  //   console.log("card selected to delete id", id)
  //   console.log("activated delete card")    
  //   deleteCard()
  //   // updateCard()
  // });

  $cardsDD.on("click", event => {
    event.preventDefault();
    let cardSel = event.target         
    console.log(typeof(event.target))
    id = $(cardSel).attr('id')
    console.log("card selected id", id)
    // main();

  });
  
  $(".updateCardBtn").on("click",function(event){
    event.preventDefault();
    popup();
});
$(".dropdown-item").on("click",function(event){
    event.preventDefault();
    let pokemonSelected = this.innerHTML;
    selectPokemon(pokemonSelected);
});

//close the modal
//selcts the pokemon add changes it 
var modal = document.getElementById("myModal");
function selectPokemon(pokemon){
  let mePokemon = pokemon
  $(".meMenu").html(mePokemon);
};

//close the modal
function closeWindow(){
  modal.style.display = "none";
};

//open the modal
function popup(){
  modal.style.display = "block";
  $(".close").on("click",function(event){
     closeWindow();
  }); 
}

});