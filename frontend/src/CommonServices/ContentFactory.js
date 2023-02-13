import { LAYOUT_TYPE } from "../API/Common";

import { getGenresTable } from "./ItemListContent/GenresContent";
import { getMoviesTable } from "./ItemListContent/MoviesContent";
import { getMovieScreeningsTable } from "./ItemListContent/MovieScreeningsContent";



const ContentFactory = {
    renderItemsTable,
    getMoviesTable,
    getGenresTable,
    getMovieScreeningsTable
}

export function renderItemsTable(layout, data, removeItem, updateItem, updateForm, showCreateModal, toggleShowCreateModal, createForm){
    switch (layout) {
        case LAYOUT_TYPE.genres:
            return getGenresTable(data, removeItem, updateItem, getTitle(LAYOUT_TYPE.genres), updateForm, showCreateModal, toggleShowCreateModal, createForm);
        case LAYOUT_TYPE.movies:
            return getMoviesTable(data, removeItem, updateItem, getTitle(LAYOUT_TYPE.movies), updateForm, showCreateModal, toggleShowCreateModal, createForm);
        case LAYOUT_TYPE.movieScreenings:
            return getMovieScreeningsTable(data, removeItem, updateItem, getTitle(LAYOUT_TYPE.movieScreenings), updateForm, showCreateModal, toggleShowCreateModal, createForm);
        default:
            break;
    }
}

function getTitle(data){
    switch (data) {
        case LAYOUT_TYPE.genres:
            return "Add new Genre!"
        case LAYOUT_TYPE.movies:
            return "Add new Movie!"
        case LAYOUT_TYPE.movieScreenings:
            return "Add new Movie Screening!"
        default:
            return "";
    }
}

export default ContentFactory;