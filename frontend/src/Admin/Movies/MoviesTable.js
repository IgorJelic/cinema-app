import { useState, useContext } from "react";
import ModalLayout from "../ModalLayout";
import { LAYOUT_TYPE, MODAL_TYPE } from "../../API/Common";
import FormFactory from "../../CommonServices/FormFactory";
import { ItemListContext } from "../ItemList";
import Pagination from "../../CommonServices/ItemListContent/Pagination";
import Search from "../../CommonServices/ItemListContent/Search";

export default function MoviesTable({data, remove, update}){
    const[id, setId] = useState(null);
    const[showUpdateModal, setShowUpdateModal] = useState(false);
    const[showRemoveModal, setShowRemoveModal] = useState(false);
    const[search, setSearch] = useState(null);


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

    function searchClick(page, pageSize, search, letters){
        setSearch({
            search: search,
            letters: letters
        });
        onClick({page, pageSize, search, letters: letters});
    }

    const tableContent = data.map(movie => {
        const imgSrc = `${process.env.REACT_APP_RESOURCES_URL}/${movie.id}_img.jpg`;

        return(
            <tr key={movie.id}>
                <td><img src={imgSrc} height='70px' width='50px' /></td>
                {/* <td>img</td> */}
                <td>{movie.name}</td>
                <td>{movie.originalName}</td>
                <td>{movie.duration}min</td>
                <td><button onClick={() => updateOnClick(movie.id)}>Update</button></td>
                <td><button onClick={() => removeOnClick(movie.id)}>Delete</button></td>
            </tr>
        )
    })

    const updateForm = FormFactory.UpdateForm(LAYOUT_TYPE.movies, id, update);

    return(
        <div className="item-table">
            <Search onSearch={searchClick}/>
            <table>
                <thead>
                    <tr>
                        <th style={{width: '100px'}}>Poster</th>
                        <th style={{width: '200px'}}>Name</th>
                        <th style={{width: '300px'}}>Original Name</th>
                        <th style={{width: '100px'}}>Duration</th>
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
                title={"Update movie: "}
                body={updateForm}
            />
            <ModalLayout
                show={showRemoveModal}
                onCloseButtonClick={toggleShowRemoveModal}
                onConfirmButtonClick={confirmRemove}
                modalType={MODAL_TYPE.confirmation}
                title={"Remove movie:"}
                body={"Are you sure?"}
            />

        </div>
    )
}