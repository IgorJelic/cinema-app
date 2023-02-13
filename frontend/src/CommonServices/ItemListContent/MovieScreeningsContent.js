import { MODAL_TYPE } from "../../API/Common"
import MovieScreeningsTable from "../../Admin/MovieScreenings/MovieScreeningsTable"
import ModalLayout from "../../Admin/ModalLayout"

export function getMovieScreeningsTable(data, removeItem, updateItem, title, updateForm, showCreateModal, toggleShowCreateModal, createForm){


    return(
        <div className='layout-content'>
            <h3 style={{display:'contents'}}>Movie Screenings: </h3>
            <button className="btn-add" onClick={toggleShowCreateModal}>Add New</button>

            <MovieScreeningsTable 
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