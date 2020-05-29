const express = require('express');
const app = express();

let recipes = []; // array of receipt objects


/** GET ALL RECIPES */
app.get('/receipe', (req, res) => {
    const data = {
        "recipes": receipes
    };
    
    res.status(200).send(data);
});

/** GET RECIPE WITH CERTAIN ID */
app.get('/receipe/:id', (req, res) => {
    const reqId = req.params.id;

    for (let i = 0; i < recipes.length; i++) {
        const recipe = receipes[i];

        if (recipe.id === reqId) {
            const data = {
                "recipe": recipes[req.params.id]
            }
        
            res.status(200).send(data);
        } else {
            const data = {
                "message": "Receipe not found!"
            }
        
            res.status(404).send(data);
        };
    };
});

/** CREATE NEW RECEIPE */
app.post('/recipe', (req, res) => {
    const data = req.body;

    // do more things here
});

/** DELETE A RECIPE */
app.delete('recipe/:id', (req, res) => {
    const reqId = req.params.id;

    for (let i = 0; i < recipes.length; i++) {
        const recipe = receipes[i];

        if (recipe.id === reqId) {
            recipes.splice(i, 1); // delete receipe at curr index
        
            res.status(200).send({
                "message": `Recipe with id ${reqId} has been deleted!`
            });
        };
    }
    

    res.status(404).send({
        "message": `Cannot find Recipe with id ${reqId}!`
    });
});

app.listen(3000, () => {
    console.log('API is running!');
});