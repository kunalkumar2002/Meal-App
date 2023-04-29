var favApp = (function(){
    let favList = JSON.parse(localStorage.getItem("fav"));
    // console.log(favList)
    let listOfMealInDOM = document.getElementById("mealList");
    function addMealToDOM(meal){
        let li = document.createElement("li");
        li.dataset.id = `${meal.idMeal}`;
        // li.setAttribute.id = "mealItem";
        li.setAttribute("class", "mealItem");
        li.innerHTML = `
        <img src="${meal.strMealThumb}" id = "poster" data-id="${meal.idMeal}" >
        <div id="details" data-set="${meal.idMeal}">

        <h1 id="mealTitle"  data-id="${meal.idMeal}">${meal.strMeal} </h1>
    
        <h3 id="mealCategory"  data-id="${meal.idMeal}">Category - ${meal.strCategory}</h3>

        <h3 id="area" data-id="${meal.idMeal}">Area - ${meal.strArea}</h3>

        <a id="youtube" href="${meal.strYoutube}" target="blank"> Tutorial </a>

        <a id="deleteBtn" 
        data-id="${meal.idMeal}" >Delete from Favourites</a>
        
        </div>
        `;
        li.setAttribute("id", `${meal.idMeal}`);
        listOfMealInDOM.append(li);
    }
    async function addMToDOM(mealId){
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        meal = await response.json(); //Note - The parameter variable is getting updated here 
        // console.log(meal.meals[0]);
        addMealToDOM(meal.meals[0])
    }
    function renderList(){
        listOfMealInDOM.innerHTML="";
        for(let i = 0; i < favList.length; i++){
            addMToDOM(favList[i]);
        }
    }
    function deleteFun(id){
        const newFav = favList.filter(function (mealId) {
            return mealId !== id;
        });
        favList = newFav;
        let ele = document.getElementById(id);
        ele.style.display ="none";
        //updating the favList array present in the localStorage
        localStorage.setItem("favList", JSON.stringify(favList));

    }
    function handleClick(e){
        const target = e.target;
        if( e.target.className === "mealItem" || e.target.id === "poster" ||e.target.id === "details" 
        || e.target.id ==="area" || e.target.id === "mealCategory" || e.target.id ==="mealTitle"){
            let mealId = e.target.dataset.id;
            localStorage.setItem("mealId", JSON.stringify(mealId));
            console.log("mealItem Clicked " + mealId + e.target);
            window.open("./../MealDetails/mealDetails.html", "_blank");
        }else if(target.id === "deleteBtn"){
            deleteFun(target.dataset.id);
        // renderList();
        }
    }
    function appInitalize(){
        document.addEventListener("click", handleClick);
        renderList();
    }
    return {
        fav_app:appInitalize,
    };

})();