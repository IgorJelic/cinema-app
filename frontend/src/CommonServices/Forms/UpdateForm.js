import { LAYOUT_TYPE } from "../../API/Common";
import UpdateGenreForm from "./Update/UpdateGenreForm";
import UpdateMovieForm from "./Update/UpdateMovieForm";
import UpdateMovieScreeningForm from "./Update/UpdateMovieScreeningForm";

// formDataType = genres/movies/moivescreenings
// id = genreId/movieId/movieScreeningId
export function UpdateForm(formDataType, id, onSubmitUpdateForm){
    switch (formDataType) {
        case LAYOUT_TYPE.genres:
            return <UpdateGenreForm id={id} onSubmitClick={onSubmitUpdateForm}/>
        case LAYOUT_TYPE.movies:
            return <UpdateMovieForm id={id} onSubmitClick={onSubmitUpdateForm}/>
        case LAYOUT_TYPE.movieScreenings:
            return <UpdateMovieScreeningForm id={id} onSubmitClick={onSubmitUpdateForm}/>
        default:
            return null;
    }
}