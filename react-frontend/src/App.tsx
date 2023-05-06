import './App.css'
import {IngredientShowAll} from "./components/ingredients/IngredientsShowAll";
import {AddIngredient} from "./components/ingredients/AddIngredient";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {IngredientDelete} from "./components/ingredients/IngredientDelete";
import {IngredientDetails} from "./components/ingredients/IngredientDetails";
import {IngredientEdit} from "./components/ingredients/IngredientEdit";
import {IngredientFilter} from "./components/ingredients/IngredientFilter";
import {AppMenu} from "./components/AppMenu";
import { FoodShowAll } from './components/foods/FoodsShowAll';
import { AddFood } from './components/foods/AddFood';
import { FoodDelete } from './components/foods/FoodDelete';
import { FoodDetails } from './components/foods/FoodDetails';
import { FoodEdit } from './components/foods/FoodEdit';
import { ChefShowAll } from './components/chefs/ChefsShowAll';
import { AddChef } from './components/chefs/AddChef';
import { ChefDelete } from './components/chefs/ChefDelete';


function App() {
  return (

      <>
          <BrowserRouter>
              <AppMenu />
              <Routes>
                  <Route path ="/ingredients/" element = {<IngredientShowAll/>}/>
                  <Route path ="/ingredients/add/" element = {<AddIngredient/>}/>
                  <Route path="/ingredients/:id/delete" element={<IngredientDelete/>} />
                  <Route path="/ingredients/:id/details" element={<IngredientDetails />} />
                  <Route path="/ingredients/:id/edit" element={<IngredientEdit />} />
                  <Route path="/ingredients/ingredientFilter/" element={<IngredientFilter />} />


                  <Route path ="/food/" element = {<FoodShowAll/>}/>
                  <Route path ="/food/add/" element = {<AddFood/>}/>
                  <Route path="/food/:id/delete" element={<FoodDelete/>} />
                  <Route path="/food/:id/details" element={<FoodDetails />} />
                  <Route path="/food/:id/edit" element={<FoodEdit />} />

                  <Route path ="/chef/" element = {<ChefShowAll/>}/>
                  <Route path ="/chef/add/" element = {<AddChef/>}/>
                  <Route path="/chef/:id/delete" element={<ChefDelete/>} />
                  <Route path="/chef/:id/details" element={<FoodDetails />} />
                  <Route path="/chef/:id/edit" element={<FoodEdit />} />
            </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
