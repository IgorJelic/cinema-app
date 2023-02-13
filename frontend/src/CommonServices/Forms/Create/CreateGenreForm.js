import { useRef } from "react";
import ToastifyService from "../../Toastify/ToastifyService";
import ValidationService from "../../Validators/ValidationService";

export default function CreateGenreForm({onSubmitClick}){
    let name = useRef(null);

    function onSubmit(e){
        e.preventDefault();

        const genre = {
            name: name.current.value
        }

        if(ValidationService.ValidateGenre(genre))
            onSubmitClick(genre);
        else{
            ToastifyService.notifyErr('Invalid form!');
        }
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Genre Name: </label>
                <input id="name" type="text" ref={name}/>
                <br/>
                <button className="btn-add-form" type="submit">Add</button>
            </form>
        </>
    )
}