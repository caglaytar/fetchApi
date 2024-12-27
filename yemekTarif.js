const getRecipeBtn = document.getElementById('getRecipeBtn');
const recipeDiv = document.getElementById('recipe');

getRecipeBtn.addEventListener('click', async () => {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Veri alınırken hata oluştu');
        }
        const data = await response.json();
        const meal = data.meals[0];  // İlk (ve tek) yemek

        // Tarif bilgilerini göstermek
        displayRecipe(meal);
    } catch (error) {
        recipeDiv.innerHTML = `<p>Hata: ${error.message}</p>`;
        recipeDiv.style.display = 'block';
    }
});

function displayRecipe(meal) {
    recipeDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Malzemeler</h3>
        <p class="ingredients">${getIngredients(meal)}</p>
        <h3>Yapılış</h3>
        <p class="instructions">${meal.strInstructions}</p>
    `;
    recipeDiv.style.display = 'block';
}

function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `${ingredient} - ${measure}<br>`;
        }
    }
    return ingredients || 'Malzeme bulunamadı';
}
