export function FormModal(title, body, onCloseButtonClick){
    return(
        <div className="modal-wrapper">
            <div className="modal">
                <div className="header">
                    <h4>{title}</h4>
                </div>
                <div className="body">
                    {/* kao body dobijam gotovu generisanu formu, njoj prosledjujem onSubmitButtonClick */}
                    {body}
                </div>
                <div className="footer">
                    <button className="btn-close" onClick={onCloseButtonClick}>Close</button>
                </div>
            </div>
        </div>
    )
}