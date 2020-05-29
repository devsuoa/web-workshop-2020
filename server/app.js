const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let recipes = []; // array of receipt objects


/** GET ALL RECIPES */
app.get('/recipe', (req, res) => {
    const data = {
        "recipes": recipes
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
    let newId;

    if (recipes.length > 0) {
        newId = recipes[recipes.length-1].id + 1; // get last recipe currently in array, newId is that recipe's id + 1
    } else {
        newId = 1;
    }
    
    const data = {
        "id": newId,
        "name": req.body.name,
        "content": req.body.content
    }

    console.log(data);
    recipes.push(data);

    res.status(200).send("Posted recipe");
});

/** DELETE A RECIPE */
app.delete('/recipe/:id', (req, res) => {
    const reqId = parseInt(req.params.id);
    
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        if (recipe.id === reqId) {
            recipes.splice(i, 1); // delete receipe at curr index
        
            res.status(200).send({
                "message": `Recipe with id ${reqId} has been deleted!`
            });
            return;
        };
    }
    

    res.status(404).send({
        "message": `Cannot find Recipe with id ${reqId}!`
    });
});

app.listen(3000, () => {
    console.log('API is running!');
});