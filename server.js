import express from "express";
import recipeRouter from "./routes/recipe.js"
// import userRouter from "./routes/user.js";
import authRoutes from "./routes/authRoutes.js"
import passport from "passport";
import setupJWTStrategy from "./auth/index.js"

export default async function createServer(){
    const app = express();

    app.use(express.json());
    setupJWTStrategy(passport)
    // app.use("/user", userRouter())
    app.use("/recipe", recipeRouter(passport))

    app.use("/auth", authRoutes)
    return app;
}
