const meal_container = document.getElementById('meal');

const getMeal = async () => {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(data.meals[0][`strIngredient${i}`]) {
                ingredients.push(`${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`);
                console.log(ingredients);
                
		} else {
			break;
        };
    //Set inner HTML 
        const newInnerHTML = `
    <div class="row-1">
        <div class="columns five">
            <img class="thumb-img" src="${data.meals[0].strMealThumb}" alt="Meal Image">
            ${data.meals[0].strCategory ? `<p><strong>Category:</strong> ${data.meals[0].strCategory}</p>` : ''}
            ${data.meals[0].strArea ? `<p><strong>Area:</strong> ${data.meals[0].strArea}</p>` : ''}
            ${data.meals[0].strTags ? `<p><strong>Tags:</strong> ${data.meals[0].strTags.split(',').join(', ')}</p>` : ''}
            <h5>Ingredients:</h5>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        <div class="columns seven">
            <h4>${data.meals[0].strMeal}</h4>
            <p>${data.meals[0].strInstructions}</p>
        </div>
    </div>
    ${data.meals[0].strYoutube ? `
    <div class="row-2">
        <h5>Video Recipe</h5>
        <div class="videoWrapper">
            <iframe class="video"
            src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}">
            </iframe>
        </div>
    </div>` : ''}
`;

meal_container.innerHTML = newInnerHTML;
    };
    
    } catch(err) {
        console.error(err);
    };

};