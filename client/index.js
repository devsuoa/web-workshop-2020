const recipeNameElement = document.getElementById('recipe-name');
const recipeContentElement = document.getElementById('recipe-content');
const submitRecipeElement = document.getElementById('submit-recipe');
const refreshRecipesElement = document.getElementById('refresh-recipes');
const recipeDivElement = document.getElementById('recipes-div');
const deleteRecipeId = document.getElementById('recipe-id-to-delete');
const deleteRecipeElement = document.getElementById('delete-recipe');

/** LISTENER FOR SUBMIT RECIPE BUTTON */
submitRecipeElement.addEventListener('click', () => {
    postNewRecipe(recipeNameElement.value, recipeContentElement.value);
});

/** LISTENER FOR REFRESH RECIPES BUTTON */
refreshRecipesElement.addEventListener('click', () => {
    getAllRecipes();
});

/** LISTENER FOR DELETE RECIPE BUTTON */
deleteRecipeElement.addEventListener('click', () => {
    deleteRecipe(deleteRecipeId.value);
})

/** FUNCTION FOR POSTING A RECIPE TO THE SERVER */
async function postNewRecipe(recipeName, recipeContent) {
    const data = {
        "name": recipeName,
        "content": recipeContent
    };
    
    const response = await fetch('http://localhost:3000/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status == 200) {
        alert('Success!');
    } else {
        alert('Failed to add new Recipe! :(');
    }
};

/** FUCNTION FOR GETTING ALL RECIPES FROM THE SERVER */
async function getAllRecipes() {
    console.log('refreshing recipes');

    recipeDivElement.innerHTML = ''; // setting the recipe div to empty before updating with all recipes

    const response = await fetch('http://localhost:3000/recipe', {
        method: 'GET'
    });

    const data = await response.json();

    const recipes = data.recipes;
    
    recipes.forEach(recipe => {
        const recipeElement = () => {
            const recipeElement = document.createElement('div');
            const recipeId = document.createElement('h5');
            const recipeName = document.createElement('h5');
            const recipeContent = document.createElement('p')

            recipeId.innerHTML = "id: " + recipe.id;
            recipeName.innerHTML = "recipe name: " + recipe.name;
            recipeContent.innerHTML = "recipe content " + recipe.content;

            recipeElement.appendChild(recipeId);
            recipeElement.appendChild(recipeName);
            recipeElement.appendChild(recipeContent);

            recipeElement.className = "recipe-element"

            return recipeElement;
        }

        recipeDivElement.appendChild(recipeElement());
    });
}

/** FUNCTION FOR DELETING A RECIPE */
async function deleteRecipe(recipeId) {
    console.log(`deleting recipe with id ${recipeId}`);

    const response = await fetch(`http://localhost:3000/recipe/${recipeId}`, {
        method: 'delete'
    });

    if (response.ok) {
        alert(`Succesfully deleted recipe with id ${recipeId}`);
    } else {
        alert(`Couldn't find recipe with id ${recipeId}`);
    }
 
}