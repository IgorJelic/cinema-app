
export default function GenresSelect({data, selected, onSelect}){
    const genres = data.map((genre, index) => {
        if(selected.some(g => g.name === genre.name)){
            return null;
        }
        else{
            return(
                <tr key={index}>
                    <td className="td-select" onClick={() => {onSelect(genre)}}>{genre.name}</td>
                </tr>
            )
        }
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        Genres
                    </th>
                </tr>
            </thead>
            <tbody>
                {genres}
            </tbody>
        </table>
    )
}