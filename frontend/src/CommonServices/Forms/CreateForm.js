import { LAYOUT_TYPE } from "../../API/Common";
import CreateGenreForm from "./Create/CreateGenreForm";
import CreateMovieForm from "./Create/CreateMovieForm";
import CreateMovieScreeningForm from "./Create/CreateMovieScreeningForm";

// formDataType = genres/movies/moivescreenings
export function CreateForm(formDataType, onSubmitClick){
    switch (formDataType) {
        case LAYOUT_TYPE.genres:
            return <CreateGenreForm onSubmitClick={onSubmitClick}/>
        case LAYOUT_TYPE.movies:
            return <CreateMovieForm onSubmitClick={onSubmitClick}/>
        case LAYOUT_TYPE.movieScreenings:
            return <CreateMovieScreeningForm onSubmitClick={onSubmitClick}/>
        default:
            return null;
    }
}

// function CreateMovieForm(){
//     return(
//         <>
//             CreateMovieForm
//         </>
//     )
// }
// function CreateMovieScreeningForm(){
//     return(
//         <>
//             CreateMovieScreeningForm
//         </>
//     )
// }