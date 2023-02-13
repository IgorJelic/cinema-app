import { SORT_BY } from "../../API/Common"

export default function SortSelect({
    onChange
}){


    return(
        <>
            <select onChange={(e) => {onChange(e)}}>
                <option value={SORT_BY.time}>Sort By Time</option>
                <option value={SORT_BY.movie_name_asc}>Sort Movie ASC</option>
                <option value={SORT_BY.movie_name_desc}>Sort Movie DESC</option>
            </select>
        </>
    )
}