export default function Grid({rows, cols}){
    const rowCells = Array.from({length: rows}, (_, index) => index + 1);
    const colCells = Array.from({length: cols}, (_, index) => index + 1);

    const row = colCells.map((num, index) => {
        return <td className="grid-td" key={index}>{num}</td>
    })

    const content = rowCells.map((num, index) => {
        return <tr className="grid-tr" key={index}>{row}</tr>
    })

    return(
        <table className="grid-table">
            <tbody>
                {content}
            </tbody>
        </table>
    )

}