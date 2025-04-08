import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1); // remove one item at index
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-app-main-r4yh.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Create a New Recipe</h2>
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />

        <textarea
          placeholder="Description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <hr style={{ bordertop: "1px solid black", width: "400px"}} />
        <div className="ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <div className="ingredient-input" key={index}>
          <input
            type="text"
            name="ingredients"
            required
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
          <button
            type="button"
            className="remove-ingredient-btn"
            onClick={() => handleRemoveIngredient(index)}
          >
            −
          </button>
        </div>
        ))}
          <button type="button" className="add-btn" onClick={handleAddIngredient}>
            + Add Ingredient
          </button>
        </div>
        <hr style={{ bordertop: "1px solid black", width: "400px"}} />
        <textarea
          placeholder="Instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Cooking Time (in minutes)"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
          min="2"
        />

        <button type="submit" className="submit-btn">Create Recipe</button>
      </form>
    </div>
  );
};
