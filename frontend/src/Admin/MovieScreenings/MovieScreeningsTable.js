import { useState, useContext } from "react"
import ModalLayout from "../ModalLayout"
import { LAYOUT_TYPE, MODAL_TYPE } from "../../API/Common"
import FormFactory from "../../CommonServices/FormFactory";
import { ItemListContext } from "../ItemList";
import Pagination from "../../CommonServices/ItemListContent/Pagination";

export default function MovieScreeningsTable({data, remove, update}){
    const[id, setId] = useState(null);
    const[showUpdateModal, setShowUpdateModal] = useState(false);
    const[showRemoveModal, setShowRemoveModal] = useState(false);

    const {currentPage, pages, onClick} = useContext(ItemListContext);

    function toggleShowUpdateModal(id){
        setShowUpdateModal(!showUpdateModal);
        setId(id);
    }
    function toggleShowRemoveModal(id){
        setShowRemoveModal(!showRemoveModal);
        setId(id);
    }

    function confirmRemove(){
        remove(id);
        setShowRemoveModal(!showRemoveModal);
    }

    function updateOnClick(id){
        toggleShowUpdateModal(id);
        setShowRemoveModal(false);
    }
    function removeOnClick(id){
        toggleShowRemoveModal(id);
        setShowUpdateModal(false);
    }

    const updateForm = FormFactory.UpdateForm(LAYOUT_TYPE.movieScreenings, id, update);

    const tableContent = data.map(screening => {
        const imgSrc = `${process.env.REACT_APP_RESOURCES_URL}/${screening.movie.posterImage}`;
        const seatsAvailable = screening.seats.filter(seat => {
            if(seat.available) return seat;
            else return null;
        })
        const dateTime = new Date(screening.screeningTime)
            .toLocaleString('en-GB', 
                { 
                    day:'numeric',  
                    month:'long', 
                    hour: '2-digit', 
                    minute: '2-digit'
                });

            return(
                <tr key={screening.id}>
                    <td style={{textAlign: 'center'}}><img src={imgSrc} height='70px' width='50px' /></td>
                    <td>{screening.movie.name}</td>
                    <td>{dateTime}</td>
                    <td>{screening.ticketPrice}din</td>
                    <td>{seatsAvailable.length}</td>
                    <td><button onClick={() => updateOnClick(screening.id)}>Update</button></td>
                    <td><button onClick={() => removeOnClick(screening.id)}>Delete</button></td>
                </tr>
            )
        })

    return (
        <div className="item-table">
            <table>
                <thead>
                    <tr>
                        <th style={{width: '70px'}}>Poster</th>
                        <th style={{width: '150px'}}>Title</th>
                        <th style={{width: '150px'}}>Screening Time</th>
                        <th style={{width: '80px'}}>Ticket</th>
                        <th style={{width: '80px'}}>Seats left</th>
                        <th>&#128257;</th>
                        <th>&#10060;</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            <Pagination pagesCount={pages} currentPage={currentPage} onClick={onClick}/>
            <ModalLayout 
                show={showUpdateModal} 
                onCloseButtonClick={toggleShowUpdateModal}
                modalType={MODAL_TYPE.form} 
                title={"Update screening: "}
                body={updateForm}
            />
            <ModalLayout
                show={showRemoveModal}
                onCloseButtonClick={toggleShowRemoveModal}
                onConfirmButtonClick={confirmRemove}
                modalType={MODAL_TYPE.confirmation}
                title={"Remove movie screening:"}
                body={"Are you sure?"}
            />
        </div>
    )
}