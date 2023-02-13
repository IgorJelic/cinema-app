import { MODAL_TYPE } from "../../API/Common"
import GenresTable from "../../Admin/Genres/GenresTable"
import ModalLayout from "../../Admin/ModalLayout"
import styles from '../../Layout/Styles/DataTable.module.css'

export function getGenresTable(data, removeItem, updateItem, title, updateForm, showCreateModal, toggleShowCreateModal, createForm){


    return(
        <div className='layout-content'>
            <button className={styles.btnAdd} onClick={toggleShowCreateModal}>Add New</button>
            <h3>Existing Genres: </h3>

            <GenresTable 
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