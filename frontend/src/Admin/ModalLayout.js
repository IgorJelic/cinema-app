import ModalFactory from "../CommonServices/ModalFactory";
import { MODAL_TYPE } from "../API/Common";
import '../Layout/Styles/Modal.css';

export default function ModalLayout({show, onCloseButtonClick, onConfirmButtonClick, modalType, title, body}){

    if(!show){
        return null;
    }

    const content = generateModal();

    return (
        <>
            {content}
        </>
    )

    function generateModal(){
        switch (modalType) {
            case MODAL_TYPE.confirmation:
                return ModalFactory.ConfirmationModal(title, body, onConfirmButtonClick, onCloseButtonClick);
            case MODAL_TYPE.form:
                return ModalFactory.FormModal(title, body, onCloseButtonClick);
            default:
                return null;
        }
    }
}