import {combineReducers} from "redux"
import loader from "./loaderReducer";
import webFilters from './webFiltersReducer';
/* trial purpose for optimization */ 
/*import announcements from './announcementReducer';*/
import wall from './wallReducer';
import postData from './postDataReducer'
import customPostData from './customPostDataReducer'
import wallId from './wallIdReducer'
import languageSetting from './languageReducer'
import appendData from './appendDataReducer'
import error from './errorReducer'
import startEmbed from './startEmbedReducer'
import searchBar from './searchBarReducer'
import renderId from './renderIdReducer'

export default combineReducers({
    loader,
    webFilters,
    /* trial purpose for optimization */ 
    /*announcements,*/
    wall,
    postData,
    customPostData,
    wallId,
    languageSetting,
    appendData,
    error,
    startEmbed,
    searchBar,
    renderId
})