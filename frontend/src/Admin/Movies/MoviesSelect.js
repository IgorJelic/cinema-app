

export default function MoviesSelect({data, selected, onSelect}){
    const movies = data.map((movie, index) => {
        if(movie.id === selected.id) return null;
        else{
            return(
                <tr key={index}>
                    <td className="td-select" onClick={() => {onSelect(movie)}}>{movie.name}</td>
                </tr>
            )
        }
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        Movies
                    </th>
                </tr>
            </thead>
            <tbody>
                {movies}
            </tbody>
        </table>
    )
}