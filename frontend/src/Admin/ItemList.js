import { useState, useEffect, createContext } from 'react';
import { LAYOUT_TYPE, PAGE_SIZE, SORT_BY } from '../API/Common';
import FormFactory from '../CommonServices/FormFactory';
import ToastifyService from '../CommonServices/Toastify/ToastifyService';
import GenreService from '../API/Services/GenreService';
import MovieService from '../API/Services/MovieService';
import MovieScreeningService from '../API/Services/MovieScreeningService';
import ContentFactory from '../CommonServices/ContentFactory';
// import '../Layout/Styles/DataTable.css';

export const ItemListContext = createContext();

export default function ItemList({layout}){
    const[data, setData] = useState([]);
    const[pageData, setPageData] = useState({});

    const[showCreateModal, setShowCreateModal] = useState(false);

    function toggleShowCreateModal(){
        setShowCreateModal(!showCreateModal);
    }

    function onSubmitCreateForm(item){
        addNewItem(item);
    }

    const createForm = FormFactory.CreateForm(layout, onSubmitCreateForm);
    const updateForm = FormFactory.UpdateForm(layout, updateItem);

    useEffect(() => {
        decideGetData({page: 1});
    }, [layout])

    return(
        <ItemListContext.Provider value={{currentPage: pageData.currentPage, pages: pageData.pages, onClick:decideGetData}}>
            {ContentFactory.renderItemsTable(layout, data, removeItem, updateItem, updateForm, showCreateModal, toggleShowCreateModal, createForm)}
        </ItemListContext.Provider>
    )
    

    //#region Functions
    //#region SUBMIT functions
    function addNewItem(item){
        switch (layout) {
            case LAYOUT_TYPE.genres:
                GenreService.add(item)
                    .then((data) => {
                        getGenresData({page: 1, pageSize: PAGE_SIZE});
                        setShowCreateModal(!showCreateModal);
                        // toastr success
                    })
                    .catch(error => {
                        ToastifyService.notifyErr(`${error}`);
                    })
                break;
            case LAYOUT_TYPE.movies:
                MovieService.add(item)
                    .then((data) => {
                        getMoviesData({page: 1, pageSize: PAGE_SIZE});
                        setShowCreateModal(!showCreateModal);
                    })
                    .catch(error => {
                        ToastifyService.notifyErr(`${error}`);
                    })
                break;
            case LAYOUT_TYPE.movieScreenings:
                MovieScreeningService.add(item)
                    .then((data) => {
                        getMovieScreeningsData({page: 1, pageSize: PAGE_SIZE});
                        setShowCreateModal(!showCreateModal)
                    })
                    .catch(error => {
                        ToastifyService.notifyErr(`${error}`);
                    })
                break;
            default:
                break;
        }
    }
    function removeItem(id){
        switch (layout) {
            case LAYOUT_TYPE.genres:
                GenreService.remove(id).then(() => {
                    getGenresData({page: 1, pageSize: PAGE_SIZE});
                });
                break;
            case LAYOUT_TYPE.movies:
                MovieService.remove(id).then(() => {
                    getMoviesData({page: 1, pageSize: PAGE_SIZE});    
                });
                break;
            case LAYOUT_TYPE.movieScreenings:
                MovieScreeningService.remove(id).then(() => {
                    getMovieScreeningsData({page: 1, pageSize: PAGE_SIZE});    
                });
                break;
            default:
                setData([]);
                break;
        }
    }
    function updateItem(id, item){
        switch (layout) {
            case LAYOUT_TYPE.genres:
                GenreService.update(id, item)
                .then(() => {
                    getGenresData({page: 1, pageSize: PAGE_SIZE});
                })
                .catch(error =>{
                    ToastifyService.notifyErr(`${error}`);
                });
                break;
            case LAYOUT_TYPE.movies:
                MovieService.update(id, item)
                .then(() => {
                    getMoviesData({page: 1, pageSize: PAGE_SIZE});
                })
                .catch(error => {
                    ToastifyService.notifyErr(`${error}`);
                })
                break;
            case LAYOUT_TYPE.movieScreenings:
                MovieScreeningService.update(id, item).then(() => {
                    getMovieScreeningsData({page: 1, pageSize: PAGE_SIZE});    
                });
                break;
            default:
                setData([]);
                break;
        }
    }
    //#endregion

    //#region GET_DATA functions
    function decideGetData({page = 1, pageSize = PAGE_SIZE, search = "", letters = ""}){
        switch (layout) {
            case LAYOUT_TYPE.genres:
                getGenresData({page, pageSize, search, letters});
                break;
            case LAYOUT_TYPE.movies:
                getMoviesData({page, pageSize, search, letters});
                break;
            case LAYOUT_TYPE.movieScreenings:
                getMovieScreeningsData({page, pageSize});
                break;
            default:
                break;
        }
    }
    function getGenresData({page = 1, pageSize, search, letters}){
        try {
            GenreService.getAll({page, pageSize, search, letters})
                .then(data => {
                    setData(data.genres);
                    setPageData(data);
                });
        } catch (error) {
            ToastifyService.notifyErr(`${error}`);
            setData(null);
        }
    }
    function getMoviesData({page = 1, pageSize, search, letters}){
        try {
            setData([]);
            MovieService.getAll({page, pageSize, search, letters})
                .then(data => {
                    setData(data.movies);
                    setPageData(data);
                });
        } catch (error) {
            ToastifyService.notifyErr(`${error}`);
            setData(null);
        }
    }
    function getMovieScreeningsData({page = 1, pageSize, search, letters, day, genreFilter, sortBy = SORT_BY.time}){
        try {
            MovieScreeningService.getAll({page, pageSize, search, letters, day, genreFilter, sortBy})
                .then(data => {
                    setData(data.screenings);
                    setPageData(data);
                });
        } catch (error) {
            ToastifyService.notifyErr(`${error}`);
            setData(null);
        }
        setData([]);
    }
    //#endregion
    //#endregion
}