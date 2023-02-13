import { useEffect, useState } from "react";
import GenreService from "../../API/Services/GenreService";
import ToastifyService from "../../CommonServices/Toastify/ToastifyService";

export default function GenreSelect({onChange}){
    const[genres, setGenres]= useState([]);

    useEffect(() => {
        GenreService.getAll({})
            .then(data => {
                setGenres(data.genres);
            })
            .catch(err => ToastifyService.notifyErr(`${err}`));
    }, [])

    function change(e){
        const genreId = e.target.value;
        onChange(genreId);
    }

    const options = genres.map((genre, index) => {
        return <option key={index} value={genre.id}>{genre.name}</option>
    })

    return(
        <>
            <select onChange={(e) => {change(e)}}>
                <option value="">
                    Genre
                </option>
                {options}
            </select>
        </>
    )
}