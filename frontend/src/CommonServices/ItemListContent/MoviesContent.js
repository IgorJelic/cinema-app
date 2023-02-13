import { MODAL_TYPE } from "../../API/Common"
import MoviesTable from "../../Admin/Movies/MoviesTable"
import ModalLayout from "../../Admin/ModalLayout"

export function getMoviesTable(data, removeItem, updateItem, title, updateForm, showCreateModal, toggleShowCreateModal, createForm){

    
    return(
        <div className='layout-content'>
            <h3 style={{display:'contents'}}>Movies: </h3>
            <button className="btn-add" onClick={toggleShowCreateModal}>Add New</button>

            <MoviesTable 
                data={data}
                remove={removeItem} 
                update={updateItem} 
                title={title}
                updateModalBody={updateForm}
                />
            <ModalLayout 
                show={showCreateModal} 
                onCloseButtonClick={toggleShowCreateModal} 
                modalType={MODAL_TYPE.form} 
                title={title}
                body={createForm}
            />                    
            
        </div>
    )
}