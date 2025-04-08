import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-app-main-r4yh.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      if (!userID) return; // 🛡️ Don't fetch if not logged in
      try {
        const response = await axios.get(
          `https://recipe-app-main-r4yh.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipe-app-main-r4yh.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h1 className="home-title">🍽️ Recipes</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img className="recipe-img" src={recipe.imageUrl} alt={recipe.name} />
            <div className="recipe-body">
              <h2>{recipe.name}</h2>
              <p>{recipe.instructions}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
              {userID && (
                <button
                  className="save-btn"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "✔ Saved" : "💾 Save"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
