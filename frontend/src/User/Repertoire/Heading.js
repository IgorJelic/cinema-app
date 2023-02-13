import { SORT_BY } from "../../API/Common";
import DateSelect from "./DateSelect";
import GenresSelect from "./GenreSelect";
import SortSelect from "./SortSelect";

export default function Heading({
    onDateChange,
    onGenreChange,
    onSortChange
}){
    

    return(
        <>
            <h1><b><i>Repertoire</i></b></h1>
            <DateSelect onChange={onDateChange}/>
            <GenresSelect onChange={onGenreChange}/>
            <SortSelect onChange={onSortChange}/>
            {/* <select onChange={(e) => {onSortChange(e)}}>
                <option value={SORT_BY.time}>Sort By Time</option>
                <option value={SORT_BY.movie_name_asc}>Sort By Movie ASC</option>
                <option value={SORT_BY.movie_name_desc}>Sort By Movie DESC</option>
            </select> */}
        </>
    )
}