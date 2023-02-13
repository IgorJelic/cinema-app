import { PAGE_SIZE } from '../../API/Common';
import styles from '../../Layout/Styles/Pagination.module.css'


export default function Pagination({
    onClick,
    pagesCount,
    currentPage
}){
    const buttonList = [];

    for(let i = 0; i < pagesCount; i++){
        buttonList.push({page: i+1, active: currentPage === i+1 ? true : false});
    }

    const buttons = buttonList.map((button, index) => {
        return (<button 
            key={index}
            className={button.active ? `${styles.paginationBtn} ${styles.active}` : styles.paginationBtn}
            onClick={() => {onClick({page: button.page, pageSize: PAGE_SIZE})}}
            >
            {button.page}
        </button>)
    })

    return(
        <div className={styles.pagination}>
            {buttons}
        </div>
    )

}