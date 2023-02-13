import { useEffect, useRef } from "react";
import GenreService from "../../../API/Services/GenreService";
import ToastifyService from "../../Toastify/ToastifyService";

export default function UpdateGenreForm({id, onSubmitClick}){
    let name = useRef(null);

    useEffect(() => {
        GenreService.getById(id)
            .then(data => {
                name.current.value = data.name;
            })
    },[]);

    function onSubmit(e){
        e.preventDefault();

        const genre = {
            name: name.current.value
        }

        if(ValidForm(genre))
            onSubmitClick(id, genre);
        else{
            // toastr err
            ToastifyService.notifyErr('Invalid form!');
        }
    }

    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Genre Name: </label>
            <input id="name" type="text" ref={name}/>
            <br/>
            <button className="btn-add-form" type="submit">Update</button>
        </form>
    )


    function ValidForm(genre){
        if(genre.name === '')
            return false;
        
        return true;
    }
}