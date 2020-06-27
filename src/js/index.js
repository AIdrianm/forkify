import Search from './models/Search';
import * as searchView from './view/searchView';
import { elements, renderLoader, clearLoader} from './view/base';
/** Global state of the app
 *  - Search object
 *  - Current recipies object
 *  - Shopping list object
 *  - liked recipies 
 */
const state = {};

const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();


    if (query) {
        // New search object and add to state 
        state.search = new Search(query);
    
        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // Search for recipies
       await state.search.getResults();

        // Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


/*
SEARCH CONTROLLER
*/

const constrolRecipe = () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes 

        // Create new recipe object
        state.recipe = Recipe(id)

        // Get recipe data  

        // Calculate servings and time

        // Render recipe

    }
};


window.addEventListener('hashchange', controlRecipe);
