import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-main-r4yh.onrender.com/recipes/savedRecipes/${userID}`
        );
        console.log("Fetched Recipes:", response.data.savedRecipes); // ✅ logs here
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };
  
    fetchSavedRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Saved Recipes</h1>
      <div className="recipes-grid">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-img" />
            <div className="recipe-body">
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
