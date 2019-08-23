
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base.js';



/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shoping list object
 * - Liked recipes
 */

  const state = {};


  /**
   *  SEARCH CONTROLLER
   */
  const controlSearch = async () => {
      // 1 Get query from view
      const query = searchView.getInput();
      console.log(query);
      
      if (query) {
          // 2 New search object and add to state
          state.search = new Search(query);
      }

          //3 Prepare UI
          searchView.clearInput();
          searchView.clearResults();
          renderLoader(elements.searchRes);
          
         try {
          
          //4 Search for recipes
          await state.search.getResults();

          //5 Render results on UI
           clearLoader();
           searchView.renderResults(state.search.result);

         } catch (err) {
            alert('Something wrong with the search....')
           clearLoader();
         }
       
  };

  elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
  });
 
  // we need to atach listener to the element that is already there and we need to figure out where the event happened

   elements.searchResPages.addEventListener('click', e => {
     // we have closest method...
     const btn = e.target.closest('.btn-inline');
     if(btn) {
       const goToPage = parseInt(btn.dataset.goto, 10);
       searchView.clearResults();
       searchView.renderResults(state.search.result, goToPage);
     }
   })

 /**
   *  RECIPE CONTROLLER
   */
   
   const controlRecipe = async () => {
 
    // Get ID from url
     const id = window.location.hash.replace('#', '');
     console.log(id);
    

     if (id) {
       // Prepare UI for changes
       recipeView.clearRecipe();
       renderLoader(elements.recipe); 

       // Create new recipe object

       state.recipe = new Recipe(id);
        

       try {
         // Get recipe data  and parse ingredients
       await state.recipe.getRecipe();
       state.recipe.parseIngredients();      

       // Calculate servings and time
       state.recipe.calcTime();
       state.recipe.calcServings();

       // Render recipe
       clearLoader();
       recipeView.renderRecipe(state.recipe);
        
       } catch (error) {
          alert('Error processing recipe!');
       }
       
     }
   };
  
    // window.addEventListener('hashchange', controlRecipe);
    // window.addEventListener('load', controlRecipe);

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



































 

