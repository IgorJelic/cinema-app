export function ConfirmationModal(title, body, onConfirmButtonClick, onCloseButtonClick){
    return(
        <div className="modal-wrapper">
            <div className="modal">
                <div className="header">
                    <h4>{title}</h4>
                </div>
                <div className="body">
                    <p>{body}</p>
                </div>
                <div className="footer">
                    <button className="btn-confirm" onClick={onConfirmButtonClick}>Confirm</button>
                    <button className="btn-close" onClick={onCloseButtonClick}>Close</button>
                </div>
            </div>
        </div>
    )
}