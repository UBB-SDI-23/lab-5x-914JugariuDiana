import './App.css'
import {IngredientShowAll} from "./components/ingredients/IngredientsShowAll";
import {AddIngredient} from "./components/ingredients/AddIngredient";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {IngredientDelete} from "./components/ingredients/IngredientDelete";
import {IngredientDetails} from "./components/ingredients/IngredientDetails";
import {IngredientEdit} from "./components/ingredients/IngredientEdit";
import {IngredientFilter} from "./components/ingredients/IngredientFilter";
import {AppMenu} from "./components/AppMenu";


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
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
