var movDetails = (function(){
    let mealId = JSON.parse(localStorage.getItem("mealId"));
   
    // let container = document.getElementById("container");
    let mealName = document.getElementById("mealName");
    let photo = document.getElementById("photo");
    let mealType = document.getElementById("mealType");
    let mealCategory = document.getElementById("mealCategory");
    let instruction = document.getElementById("instruction");
    let ingridents = document.getElementById("ingridents");
    
    async function fetchMovieDetails(){
            
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        meal = await response.json();
        meal = meal.meals[0];
        
        document.title = `${meal.strMeal}`;

        mealName.innerHTML =
        `
        <h3>Meal Name - ${meal.strMeal}</h23>
        `;

        photo.innerHTML = 
        `
        
        <img src="${meal.strMealThumb}">
        `;

        mealType.innerHTML = 
        `
        <h3>Meal Type - ${meal.strArea}</h3>
        
        `;

        mealCategory.innerHTML=
        `
        <h3>Meal Category - ${meal.strCategory}</h3>
        
        `;

        const recipeString = meal.strInstructions;
        const recipeArray = recipeString.split("\r\n");
        instruction.innerHTML = 
        `
        <h2 id="instructionLable">Instructions</h2>
        `;
        recipeArray.forEach(step => {
            const p = document.createElement("p");
            p.innerText = step;
            instruction.appendChild(p);
        });



        ingridents.innerHTML = 
        `
        <h3> List of Ingridents </h3>

        <ul>
            <li> Ingridents 1 => ${meal.strIngredient1} </li>
            <li> Ingridents 2 => ${meal.strIngredient2} </li>
            <li> Ingridents 3 => ${meal.strIngredient3} </li>
            <li> Ingridents 4 => ${meal.strIngredient4} </li>
            <li> Ingridents 5 => ${meal.strIngredient5} </li>
            <li> Ingridents 6 => ${meal.strIngredient6} </li>
            <li> Ingridents 7 => ${meal.strIngredient7} </li>
            <li> Ingridents 8 => ${meal.strIngredient8} </li>
            <li> Ingridents 9 => ${meal.strIngredient9} </li>
            <li> Ingridents 10 => ${meal.strIngredient10} </li>
        <ul>
        `;

    }
    return {
        fetchMovieDetails:fetchMovieDetails,
    };
})();