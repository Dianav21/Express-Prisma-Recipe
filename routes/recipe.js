import express from "express"
import { prisma } from "../db/index.js"


export default function recipeRouter(passport){
    const router = express.Router();

//todo
router.get("/", async (request, response) => {
    //Send back all recipe

    //tells prisma to talk to database and find stuff
    const allRecipes = await prisma.recipes.findMany({
        
        include: {
            user: true 
        }
    });
    
    //after that, it will send back a response
    response.status(200).json({
        success: true,
        recipes: allRecipes
    });
})

router.post("/", passport.authenticate("jwt", {session: false}), async (request, response) => {
    //creates a recipe
    
    const newRecipe = await prisma.recipes.create({
        data: {
            name: request.body.recipe,
            userId: request.user.id,
            description: request.body.description
        }
    });
    console.log(newRecipe);

    response.status(201).json({
        success: true
    });
})
//updates recipes 
router.put("/:recipeId", passport.authenticate("jwt", {session: false}), async (request, response) => {
    const updateRecipe = await prisma.recipe.update({
        where: {
            id: parseInt(request.params.recipeId)
        },
        data: {
            name: request.body.recipe,
            description: request.body.description
        }
    });
    //sends back response if it works 
    response.status(200).json({
        success: true, 
        message: "recipe updated."
    });
})

router.delete("/:recipeId", passport.authenticate("jwt", {session: false}), async (request, response) => {
    const deleteRecipe = await prisma.recipe.delete({
        where: {
            id: parseInt(request.params.recipeId)
        }
    });
    response.status(200).json({
        success: true, 
        message: "recipe deleted!"
    })
})
router.get("/:userId/:recipeId", passport.authenticate("jwt", {session: false}), async function(request, response){
    try {
        const getRecipe = await prisma.recipes.findMany({
            where:{
                id:parseInt(request.params.recipeId),
                user:{
                    id:{
                        equals:parseInt(request.params.userId),
                    
                    }
                }
                
            }
        })
    
        response.status(200).json({
            sucess: true,
            data: getRecipe
            
        })
    } catch (error) {
        console.log(error)
    }
   
})
return router;
}
