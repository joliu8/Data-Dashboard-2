import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY
import './ListItem.css'

const ListItem = ({ id, reportCooktime, reportDiets }) => {
    const [list, setList] = useState(null);
    // const[link, setLink] = useState(null);
    useEffect(() => {
        const fetchRecipeData = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            );
            const json = await response.json();
            setList(json);
        };

        fetchRecipeData().catch(console.error);

    }, [id]);

    useEffect(() => {
        if (list) {
            reportCooktime(id, list.readyInMinutes)
            reportDiets(id, [...list.diets, "No restrictions"]);
            console.log(list.diets)



        }
    }, [list]);


    return (
        list ? (
            <div className="list-item" key={list.id}>
                <a className="list-item-title" target="_blank" href={list.sourceUrl} >{list.title}</a>

                <p></p>
                <img
                    className="list-item-image"
                    src={list.image}
                    alt={`Small icon for recipe # ${list.id}`}
                />

                {/* {price && price.USD ? ` $${price.USD} USD` : null} */}
                <p className="list-item-minutes">Cooktime: {list.readyInMinutes} minutes</p>
            </div>
        ) : null
    );
}

export default ListItem