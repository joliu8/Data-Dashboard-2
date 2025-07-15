import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY
import ListItem from "./ListItem"
import Card from "./Card"
import './List.css'

const List = () => {

    const [recipesList, setRecipesList] = useState(null);

    useEffect(() => {

        const fetchRecipes = async () => {

            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`)

            const json = await response.json();
            setRecipesList(json);

        }

        fetchRecipes().catch(console.error);
    }, [])

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [cooktimes, setCooktimes] = useState({});
    const [minsInput, setMinsInput] = useState("");

    const [diets, setDiets] = useState({});
    const [dietInput, setDietInput] = useState("None");

    const searchItems = searchValue => {
        setSearchInput(searchValue)
        if (searchValue !== "") {
            const filteredData = recipesList.results.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())

            );
            setFilteredResults(filteredData);
        } else {
            // setFilteredResults([]);
            setFilteredResults(recipesList.results);
        }
    }

    const getFilteredRecipes = () => {
        let recipes = searchInput.length > 0 ? filteredResults : (recipesList?.results || []);
        if (minsInput !== "") {
            recipes = recipes.filter(recipe => {
                const cooktime = cooktimes[recipe.id];
                return cooktime !== undefined && cooktime <= parseInt(minsInput, 10);
            });
        }

        if (dietInput !== "None") {
            recipes = recipes.filter(recipe => {
                const d = diets[recipe.id];
                // console.log(d)
                return d !== undefined && d.includes(dietInput);


            });
        }
        return recipes;
    };

    return (
        <div className="cards-and-recipe-list">
            <div className="cards-list">
                <Card title="Number of Returned Recipes" info={recipesList && recipesList.number ? recipesList.number : 10} />
                <Card title="Total Recipes" info={recipesList && recipesList.totalResults ? recipesList.totalResults : -1} />
                <Card title="Offset" info={recipesList && recipesList.offset ? recipesList.offset : 0} />
            </div>
            {/* <input type="text" placeholder='Search by recipe' onChange={(inputString) => setSearchInput(inputString.target.value)} />
            <input type="text" placeholder='Search by cooktime' onChange={(inputNum) => setMinsInputs(inputNum.target.value)} />
            <button type="submit" placeholder="Submit" onChange={searchItems(searchInput, minsInput)} */}

            <div className="inputs-list">
            <input type="text" placeholder='Search by recipe' onChange={(inputString) => searchItems(inputString.target.value)} />

            <input
                type="number"
                placeholder="Max cooktime (minutes)"
                value={minsInput}
                onChange={e => setMinsInput(e.target.value)}
            />

            <select value={dietInput} onChange={e => { setDietInput(e.target.value) }}>
                <option value="No restrictions">No restrictions</option>
                <option value="vegan">Vegan</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
            </select>
            </div>


            <div className="recipe-list">
                {getFilteredRecipes().map((recipe) => (
                    <ListItem
                        key={recipe.id}
                        id={recipe.id}
                        reportCooktime={(id, cooktime) => {
                            setCooktimes(prev => ({ ...prev, [id]: cooktime }));
                        }}
                        reportDiets={(id, diets) => {
                            setDiets(prev => ({ ...prev, [id]: diets }))
                        }}
                    />
                ))}

            </div>



        </div >
    );
}
export default List