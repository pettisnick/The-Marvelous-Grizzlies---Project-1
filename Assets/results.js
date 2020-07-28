$(document).ready(function () {
    var lastSearched = localStorage.getItem("lastKey"); //get item last searched from local storage
    var foodObject = JSON.parse(localStorage.getItem(lastSearched)); //get food details of item last searched
    var searchList = JSON.parse(localStorage.getItem("userSearch")); //get search array from local storage
    
    renderSearchCriteria(foodObject); //display what the user searched for
    renderResult(foodObject); //display primary result (to eat or not eat)
    renderHistory(searchList); //update history dropdown
    alternatives(foodObject); //update alternate pictures depending on search result

    $('.search-dropdown').on('click', function (event) { //on click of search history, show user menu of previously searched
        event.preventDefault();
        $('.search-dropdown').toggleClass('is-active');
    });

    $(".history-item").on("click", displaySelect);

    $('.search-btn').on('click', searchScreen);
})

//Function to display selected history item
function displaySelect(event) {
    event.preventDefault();
    var historyItem = event.target.textContent;
    var historyObject = JSON.parse(localStorage.getItem(historyItem));
    renderSearchCriteria(historyObject);
    renderResult(historyObject);
    alternatives(historyObject);
}

//Function to update search criteria display
function renderSearchCriteria(itemObject) {
    $("#allergyInput").attr("value", itemObject.allergy);
    $("#categoryInput").attr("value", itemObject.category);
    $("#itemInput").attr("value", itemObject.name);
}
//Function to update main result (to eat or not eat)
function renderResult(itemObject) {
    var foodImgUrl = itemObject.image;
    $("#food-img").attr("src", foodImgUrl);
    $("#food-img").attr("alt", "image of food");
    var result = itemObject.searchResult;
    if (result == "true") {
        $("#resultPhrase").text("You're good to go. Enjoy!");
    } else {
        $("#resultPhrase").text("Stop! " + itemObject.name + " has " + itemObject.allergy);
    }
    var imgUrl = "./Assets/" + result + ".png";
    $("#results-img").attr("src", imgUrl);
    $("#results-img").attr("alt", "image with sign of result");
   
}
//Function to update history
function renderHistory(list){
    list.forEach(function (food) {
        var itemEl = $("<a class='history-item'>");
        itemEl.text(food);
        $(".history-content").append(itemEl);    
    })
}
function alternatives(itemObject){
    let allergySearch = itemObject.allergy;
    let res = itemObject.searchResult;
    let searchCat = itemObject.category;
    console.log(searchCat)
    console.log(allergySearch)
    
    if (allergySearch === "Peanuts" && res === "false"){
        $("#firstAlt").attr("src", "./Assets/Substitutes/peanut-free.jpg");
        $("#secondAlt").attr("src", "./Assets/Substitutes/peanut-free3.jpeg");
    }else if (allergySearch === "Dairy" && res === "false" && searchCat === "Snack"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/dairy-free.jpg");
       $("#secondAlt").attr("src", "./Assets/Substitutes/dairy-free2.jpg");
    }else if (allergySearch === "Dairy" && res === "false" && searchCat === "Drink"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/dairy-free-drink.png");
       $("#secondAlt").attr("src", "./Assets/Substitutes/dairy-free-drink2.jpg");
    }else if (allergySearch === "Eggs" && res === "false"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/egg-free.png");
       $("#secondAlt").attr("src", "./Assets/Substitutes/egg-free2.jpeg");
    }else if (allergySearch === "Tree Nuts" && res === "false"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/treenut-free.jpeg");
        $("#secondAlt").attr("src", "./Assets/Substitutes/treenut-free2.jpeg");
    }else if (allergySearch === "Wheat" && res === "false"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/dairy-free2.jpg");
        $("#secondAlt").attr("src", "./Assets/Substitutes/wheat-free.jpeg");
    }else if (allergySearch === "Soy" && res === "false"){
       $("#firstAlt").attr("src", "./Assets/Substitutes/soy-free.jpg");
       $("#secondAlt").attr("src", "./Assets/Substitutes/soy-free2.png");
    }else if (res === "true"){
        $(".link").addClass("display-none")
        $("#firstAlt").addClass("display-none")
        $("#secondAlt").addClass("display-none")
        $("#alt-food").text("Great Choice!")
       //  document.getElementById("firstAlt").style.display= "none";
       //  document.getElementById("secondAlt").style.display= "none";
    }
    console.log(itemObject)
   }  

//Function to redirect
function searchScreen() {
    window.location.href = "./index.html"; //redirect to Landing Page
}