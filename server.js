import express from "express";
import recipeRouter from "./routes/recipe.js"
// import userRouter from "./routes/user.js";
import authRoutes from "./routes/authRoutes.js"
import passport from "passport";

export default async function createServer(){
    const app = express();

    app.use(express.json());
    // app.use("/user", userRouter())
    app.use("/recipe", recipeRouter())

    app.use("/auth", authRoutes)
    return app;
}
