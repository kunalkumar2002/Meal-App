const search = document.getElementById('search');
const listofMeal = document.getElementById('listofMeal');
const result = document.getElementById('result-heandling');

let mealList = [];
let fav = [];

//adding mealList to dom

function addMealToDom(meal){
    let li = document.createElement("li")
    li.dataset.id = `${meal.idMeal}`
    li.setAttribute('id','mealItem')
    
    //creating list of each individual meal;
    li.innerHTML = `
    <div class="meal">
        <img src="${meal.strMealThumb}" id = "poster" data-id="${meal.idMeal}" >
        <div id="details" data-id="${meal.idMeal}">
        
        <h2 id="mealTitle"  data-id="${meal.idMeal}">${meal.strMeal} </h1>

        <h3 id="area" data-id="${meal.idMeal}">Area - ${meal.strArea}</h3>

        <p><a id="youtube" href="${meal.strYoutube}" target="blank"> Tutorial </a></p>

        <a id="favBtn" data-id="${meal.idMeal}" data-title="${meal.strMeal}">Add to Favourites</a>
        
        </div>
    </div>    
    `;
    //appending each meal to listofMeal
    listofMeal.append(li);
}

//searching meal
function searchMeal(text){
    //fetching meal from API
    //fetch return a prommise
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
   ).then(function(res){
    return res.json();
   }) .then(function(data){

    //checking data
     
     console.log(data);
    if(data.meals == null){
        result.innerHTML=`No meals found for ${text}`;
    }else{
        result.innerHTML = "";
        mealList = data.meals;
        listofMeal.innerHTML = "";
        for(let i = 0 ; i <mealList.length ; i++){
            addMealToDom(mealList[i]);
        }
    }
   })
}

function handlekey(e){
    if (e.key === "Enter") { // 13 is the key code for Enter key
        e.preventDefault(); // prevent the form from submitting
        const text = search.value.trim(); // remove leading/trailing white spaces
        if (text !== '') {
            searchMeal(text);
            result.innerHTML = ''; // clear the result
        } else {
            result.innerHTML = 'Please enter a meal'; // show error message
            setTimeout(function(){
                result.innerHTML = "";
            },5000);
        }
    }
}

//handling addToFab function

function addToFav(mealId , mealTitle){
    for(let i = 0 ; i< fav.length ; i++){
        if(fav[i] === mealId){
            alert("This meal is already in the Fav List");
            return ;
        }
    }
    fav.push(mealId);
    alert(`${mealTitle} added in the fav List`)
    localStorage.setItem("fav", JSON.stringify(fav));
}

function handleclick(e){
    // handle click event here
    if(e.target.id == "mealItem" || e.target.id == "poster" || e.target.id == "details"){
        e.preventDefault();
        const mealId = e.target.dataset.id;

        localStorage.setItem("mealId" , JSON.stringify(mealId));

        
        // console.log(mealId , typeof(mealId));
        window.open("./mealdetails/details.html");
    }

    //favourite button clicked

    else if(e.target.id === "favourite-btn"){

        localStorage.setItem("mealId", JSON.stringify(fav));
        window.open("./favourite/fav.html")
    }

    //clear button clicked

    else if(e.target.id === "clear-btn"){
        listofMeal.innerHTML = "";
        result.innerHTML = "";
        search.value = null;
        // console.log(mealList);
        mealList.splice(0,mealList.length);
        // console.log(mealList);
    }

    // Add to favourite clicked

    else if(e.target.id === "favBtn"){
        addToFav(e.target.dataset.id, e.target.dataset.title);
    }

}

function eventHandle(){
    search.addEventListener('keydown', handlekey);
    document.addEventListener('click', handleclick);
}

eventHandle();