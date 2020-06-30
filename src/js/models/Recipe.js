import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https:forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.title = res.data.recipe.title;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            alert(`Something went wrong :(`);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = numIng / 3;
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'cups', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'pounds', 'pound'];

        const unitsShort = ['tbs', 'tbs', 'cup', 'oz', 'oz', 'tsp', 'tsp', 'lb', 'lb'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingredients
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is an unit
                // Ex. 4 1/2 cups, arrCount is [4 1/2]
                // Ex 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); // Ex. 4 1/2 cups, arrCount is [4 1/2]

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredients: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredients: arrIng.Slice(1).join(' ')
                };

            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}
