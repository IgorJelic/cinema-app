import { useState, useContext } from "react";
import ModalLayout from "../ModalLayout";
import { LAYOUT_TYPE, MODAL_TYPE } from "../../API/Common";
import FormFactory from "../../CommonServices/FormFactory";
import { ItemListContext } from "../ItemList";
import Pagination from "../../CommonServices/ItemListContent/Pagination";
import Search from "../../CommonServices/ItemListContent/Search";
import styles from '../../Layout/Styles/DataTable.module.css';

export default function GenresTable({data, remove, update}){
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

    function pageClick({page, pageSize}){
        let searchString = "";
        let lettersString = "";
        if(search != null){
            searchString = search.search;
            lettersString = search.letters;
        }
        onClick({page, pageSize, searchString, letters: lettersString});
    }

    const tableContent = data.map(genre => {
        return(
            <tr key={genre.id}>
                <td>{genre.name}</td>
                <td><button onClick={() => updateOnClick(genre.id)}>Update</button></td>
                <td><button onClick={() => removeOnClick(genre.id)}>Delete</button></td>
            </tr>
        )
    })

    const updateForm = FormFactory.UpdateForm(LAYOUT_TYPE.genres, id, update);

    return(
        <div className="item-table">
            <Search onSearch={searchClick}/>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{width: '300px'}}>Name</th>
                        <th>&#128257;</th>
                        <th>&#10060;</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            <Pagination pagesCount={pages} currentPage={currentPage} onClick={pageClick}/>
            <ModalLayout 
                show={showUpdateModal} 
                onCloseButtonClick={toggleShowUpdateModal}
                modalType={MODAL_TYPE.form} 
                title={"Update genre: "}
                body={updateForm}
            />
            <ModalLayout
                show={showRemoveModal}
                onCloseButtonClick={toggleShowRemoveModal}
                onConfirmButtonClick={confirmRemove}
                modalType={MODAL_TYPE.confirmation}
                title={"Remove genre:"}
                body={"Are you sure?"}
            />
        </div>
    )
}