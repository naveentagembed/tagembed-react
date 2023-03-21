import axios from 'axios';
import HttpClient from "./http-client"
import { GET_WIDGET_DATA_API_PATH, GET_DATA_POST_APPEND, GET_DATA_EMBED_URL} from './api'
import {
    /* GET_EMBED_URL_DATA,  */
    GET_LOADER_ERROR,
    /*GET_ANNOUNCEMENTS_SUCCESS,*/
    GET_THEME_WEB_FILTERS_SUCCESS,
    GET_WALL_SUCCESS,
    GET_POST_DATA_SUCCESS,
    GET_CUSTOM_POST_DATA_SUCCESS,
    GET_THEME_LOADER_SUCCESS,
    GET_LANGUAGE_SUCCESS,
    GET_APPEND_DATA_SUCCESS,
    GET_NETWORK_ID_APPEND_DATA_SUCCESS,
    GET_THEME_SHOW_MORE_LOADER_SUCCESS,
    START_EMBED_IFRAME,
    GET_IFRAME_EVENT_SUCCESS,
    GET_THEME_ERROR_SUCCESS,
    GET_WEB_FILTER_LOADER_SUCCESS,
    GET_HORIZONTAL_POST_DATA_SUCCESS,
    GET_FILTERED_COMPLETE_POST_DATA_SUCCESS,
    /* trial purpose for optimization */ 
    /* GET_CURRENT_FILTER_ID,*/
    SET_HAS_MORE_DATA,
    SET_FILTER_ALL,
    SET_URLS_ACCESSED_FOR_DATA,
     /* trial purpose for optimization */ 
    /*FILTER_ALERADY_SAVED_PRERENDERED_DATA,*/
    WALL_THEME_ID_UPDATE,
    EMBED_URL_FETCHED,
    ERROR_RESPONSE_WITH_MESSAGE,
    GET_LOADER_SUCCESS,
    GET_WALL_ID_SUCCESS,
    GET_WALL_ID_ERROR,
    SEARCH_KEYWORD,
    GET_POST_DATA_SUCCESS_SEARCH,
    GET_SEARCH_LOADER_SUCCESS,
    UPDATE_REMOVE_DUPLICATE_FILTER,
    RENDER_ID
} from '../reducers/reducersKeys';
import store from '../store';
import { rowsetting } from '../constants';
import { rID } from '../utils'


const CancelToken = axios.CancelToken;
const source = CancelToken.source();


export const getThemeDataWithWallID = (Id, heightEvent) => {

    return (dispatch) => {
        

        dispatch({ type: RENDER_ID, payload: rID });
        dispatch({ type: GET_WALL_ID_SUCCESS, payload: Id });
        
       
        new HttpClient().get(`${GET_WIDGET_DATA_API_PATH}${Id}`).then((response) => {
            let {
                after,
                postData,
                webFilters,
                errorData,
                post_message,
                older_days,
                older_post,
                loaderData,
                errorCode,
                imageList
            } = response.data;
            if (parseInt(errorCode) == 404) dispatch({ type: ERROR_RESPONSE_WITH_MESSAGE, payload: response.data });
            else {
                dispatch({ type: GET_LOADER_SUCCESS, payload: response.data.loaderData });
                rowsetting(loaderData,postData)
                    dispatch({ type: GET_WALL_SUCCESS, payload: loaderData.wall });
                    dispatch({
                        type: GET_LANGUAGE_SUCCESS,
                        payload: languageSettings(loaderData.wall.Personalization.w_language, loaderData.wall.Personalization.custom_lan_data)
                    });
                /*WALL API*/
                dispatch({
                    type: GET_THEME_ERROR_SUCCESS,
                    payload: {
                        errorData: errorData,
                        post_message: post_message,
                        older_days: older_days,
                        older_post: older_post
                    }
                }); /* 1 */
                dispatch({ type: GET_POST_DATA_SUCCESS, payload: postData, isSearch: false }); /* 7 */
                dispatch({ type: GET_THEME_WEB_FILTERS_SUCCESS, payload: convertObjectToArray(webFilters) }); /* 1 */
                dispatch({
                    type: GET_APPEND_DATA_SUCCESS,
                    payload: { after: after, networkID: 0, heightEvent: heightEvent }
                }); /* 8 */

                dispatch({
                    type: SET_HAS_MORE_DATA,
                    payload: {
                        [0]: {
                            hasMoreData: Object.keys(postData).length >= loaderData.wall.ThemeRule.numberOfPosts ? true : false,
                            after: after
                        }
                    }
                });

                dispatch({ type: GET_THEME_LOADER_SUCCESS, payload: false })
            }

        })
      
       
            .catch((error) => {
                dispatch({ type: GET_LOADER_ERROR });
                dispatch({ type: GET_WALL_ID_ERROR });
            })
    }

}

/*EMBED URL*/
export const postEmbedUrlWithID = (ownerId) => {
    return (dispatch) => {
        new HttpClient().get(`${GET_DATA_EMBED_URL}`).then((response) => {
        })
    }
}

export const filteredDataApplyUpdatePostDataExtendWithNetwordID = (wallId, networkId, heightEvent, imageList) => dispatch => {
    dispatch({ type: SET_FILTER_ALL });
    return (dispatch) => {
        dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: true });
        new HttpClient().get(`${GET_WIDGET_DATA_API_PATH}${wallId}`).then((response) => {
            const { after, announcements, customPost, postData, loaderData, errorCode, imageList } = response.data;

            if (parseInt(errorCode) == 404) dispatch({ type: ERROR_RESPONSE_WITH_MESSAGE, payload: response.data });
            else {
                dispatch({ type: GET_LOADER_SUCCESS, payload: response.data.loaderData });
                setTimeout(() => {
                    dispatch({ type: GET_WALL_SUCCESS, payload: loaderData.wall });
                    dispatch({
                        type: GET_LANGUAGE_SUCCESS,
                        payload: languageSettings(loaderData.wall.Personalization.w_language, loaderData.wall.Personalization.custom_lan_data)
                    });
                }, 700)
                //dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: announcements });
                //dispatch({type: GET_CUSTOM_POST_DATA_SUCCESS, payload: customPost});
                // dispatch({type: GET_WALL_SUCCESS, payload: loaderData.wall});
                dispatch({ type: GET_POST_DATA_SUCCESS, payload: convertObjectToArray(postData), isSearch: false });
                dispatch({
                    type: GET_APPEND_DATA_SUCCESS,
                    payload: { after: after, networkID: networkId, heightEvent: heightEvent }
                });
                dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
            }
        })
            .catch((error) => {
                dispatch({ type: GET_LOADER_ERROR });
                dispatch({ type: GET_WALL_ID_ERROR });
            })
    }

}

export const languageSettings = (w_language, custom_lan_data) => {
    let cLanguage = null;
    let customLArray = null;
    let customLanguageKey = null;
    if (w_language === "custom") {
        const { getData, getKey, getCompleteData } = customLanguageParse(custom_lan_data)
        cLanguage = getCompleteData;
        customLArray = getData;
        customLanguageKey = getKey;
    }
    return {
        customLanguageData: customLArray,
        customLanguageKey: customLanguageKey, ...convertButtonNameLanguages(w_language, cLanguage)
    }

}

const convertButtonNameLanguages = (w_language, cLanguage) => {

    switch (w_language) {
        case "French": {
            return {
                buttonName: "Montre plus",
                filterButton: "Tout",
                viewOnText: "Vue sur",
                shareText: "PARTAGER",
                no_more: 'Plus de messages'
            }
        }
        case "German": {
            return {
                buttonName: "Zeig mehr",
                filterButton: "Alle",
                viewOnText: "Sehen Sie",
                shareText: "AKTIE",
                no_more: 'Keine weiteren Beiträge'
            }
        }
        case "Malay": {
            return {
                buttonName: "Tunjukkan Lagi",
                filterButton: "Semua",
                viewOnText: "Lihat di",
                shareText: "BERKONGSI",
                no_more: 'Tiada Lagi Posts'
            }
        }
        case "Dutch": {
            return {
                buttonName: "Laat meer zien",
                filterButton: "Alle",
                viewOnText: "Uitzicht op",
                shareText: "DELEN",
                no_more: 'Geen berichten meer'
            }
        }
        case "Spanish": {
            return {
                buttonName: "Mostrar más",
                filterButton: "Todas",
                viewOnText: "Ver en",
                shareText: "COMPARTIR",
                no_more: 'No más publicaciones'
            }
        }
        case "Chinese": {
            return { buttonName: "展示更多", filterButton: "分享", viewOnText: "查看", shareText: "所有", no_more: '没有更多的帖子' }
        }
        case "Korean": {
            return { buttonName: "보기", filterButton: "모든", viewOnText: "에서보기", shareText: "몫", no_more: '더 이상 게시물 없음' }
        }
        case "Italian": {
            return {
                buttonName: "Mostra di più",
                filterButton: "Tutti",
                viewOnText: "Visualizza su",
                shareText: "CONDIVIDERE",
                no_more: 'Nessun altro messaggio'
            }
        }
        case "Portuguese": {
            return {
                buttonName: "Mostre mais",
                filterButton: "Todos",
                viewOnText: "Ver no",
                shareText: "COMPARTILHAR",
                no_more: 'Mais mensagens'
            }
        }
        case "English": {
            return {
                buttonName: "Show More",
                filterButton: "All",
                viewOnText: "View on",
                shareText: "SHARE",
                no_more: 'No More Posts'
            }
        }
        case "custom": {
            return {
                buttonName: cLanguage.show_more,
                filterButton: cLanguage.p_all,
                viewOnText: cLanguage.view_on,
                shareText: cLanguage.share,
                no_more: cLanguage.no_more
 
            }
        }
        default:
            return {
                buttonName: "Show More",
                filterButton: "All",
                viewOnText: "View on",
                shareText: "SHARE",
                no_more: 'No More Posts'
            }
    }
}

const customLanguageParse = (data) => {
    let removeCha = data.slice(4, data.length).replace('{', '').replace('}', '');
    let splitWith = removeCha.split(";")
    let getData = [];
    let getKey = [];
    let getCompleteData = {};
    splitWith.map((item, index) => {
        let stringReplace = item.replace('"', '').replace('"', '')
        let key = stringReplace.slice(4)
        if (key != "0") {
            let valueKey = key.replace(':', '')
            if (index % 2 == 0) {
                getKey.push(valueKey)
            } else {
                getData.push(valueKey)
            }
        }
    })
    getKey.map((item, index) => {
        Object.assign(getCompleteData, { [item]: getData[index] })
    })

    return { getData, getKey, getCompleteData }
}

const convertObjectToArray = (obj) => {
    let result = Object.keys(obj).map((key) => obj[key]);
    return result;
}
/* trial purpose for optimization */ 
/* export const networkIdUpdate = (networkId) => {
    return (dispatch) => {
        dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });
    }
} */

export const heightEvent = (event) => {
    return (dispatch) => {
        dispatch({ type: START_EMBED_IFRAME, payload: event });
        dispatch({ type: EMBED_URL_FETCHED, payload: event });
        dispatch({ type: GET_IFRAME_EVENT_SUCCESS, payload: event });
    }
}

export const wallThemeUpdate = (themeID, wallData) => {
    return (dispatch) => {
        try {
            wallData.Personalization.widgetTheme = themeID;
            dispatch({ type: WALL_THEME_ID_UPDATE, payload: wallData });
        } catch (ex) {
            dispatch({ type: WALL_THEME_ID_UPDATE, payload: wallData });
        }
    }
}

export const filterPostDataAppendWebFilter = (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, complete_Data) => {
    return (dispatch) => {
        var updateCheck = [];
        const checkDuplicatenetwork = store.getState().postData.removeDuplicate;
        updateCheck = checkDuplicatenetwork;
        if (checkDuplicatenetwork && !updateCheck.includes(networkId)) {
            updateCheck = updateCheck.push(networkId);
            dispatch({ type: UPDATE_REMOVE_DUPLICATE_FILTER, payload: checkDuplicatenetwork });
            dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });
            dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: true });
            const searchKeyword = store.getState().searchBar.searchKeyword;
            const searchText = searchKeyword ? `${searchKeyword}` : ``;

            new HttpClient().get(`${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/${after}/1/${searchText}`).then((response) => {
                const newData = response.data.data

                const selectedNetworkId = store.getState().postData.currentFilterNetworkId;
                if ((selectedNetworkId && selectedNetworkId == networkId)) {
                    dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });

                    dispatch({
                        type: GET_FILTERED_COMPLETE_POST_DATA_SUCCESS,
                        payload: newData,
                        filterNetworkId: networkId
                    });

                    dispatch({
                        type: GET_APPEND_DATA_SUCCESS,
                        payload: { after: response.data.after, networkID: networkId, heightEvent: heightEvent },
                        filterNetworkId: networkId
                    });
                    dispatch({
                        type: SET_HAS_MORE_DATA,
                        payload: {
                            [networkId]: {
                                hasMoreData: Object.keys(newData).length < postCount ? false : true,
                                after: response.data.after
                            }
                        }
                    });

                    dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
                } else if (!selectedNetworkId) {
                    dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });

                    dispatch({
                        type: GET_FILTERED_COMPLETE_POST_DATA_SUCCESS,
                        payload: newData,
                        filterNetworkId: networkId
                    });

                    dispatch({
                        type: SET_HAS_MORE_DATA,
                        payload: {
                            [networkId]: {
                                hasMoreData: Object.keys(newData).length < postCount ? false : true,
                                after: response.data.after
                            }
                        }
                    });
                    dispatch({
                        type: GET_APPEND_DATA_SUCCESS,
                        payload: { after: response.data.after, networkID: networkId, heightEvent: heightEvent },
                        filterNetworkId: networkId
                    });
                    dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
                }

                dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: false });
            })
                .catch((error) => {
                })
        } else {
            dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });

            dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
        }
    }

}

// export const filterPostDataAppendWebFilter = (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, complete_Data) => {
//     return (dispatch) => {
//         dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });
//         dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: true });
//         const searchKeyword = store.getState().searchBar.searchKeyword;
//         const searchText = searchKeyword ? `${searchKeyword}` : ``;

//         new HttpClient().get(`${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/${after}/1/${searchText}`).then((response) => {
//             const newData = response.data.data

//             const selectedNetworkId = store.getState().postData.currentFilterNetworkId;

//             if ((selectedNetworkId && selectedNetworkId == networkId)) {
//                 dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });

//                 dispatch({ type: GET_FILTERED_COMPLETE_POST_DATA_SUCCESS, payload: newData, filterNetworkId: networkId });

//                 dispatch({ type: GET_APPEND_DATA_SUCCESS, payload: { after: response.data.after, networkID: networkId, heightEvent: heightEvent }, filterNetworkId: networkId });
//                 dispatch({ type: SET_HAS_MORE_DATA, payload: { [networkId]: { hasMoreData: Object.keys(newData).length < postCount ? false : true, after: response.data.after } } });

//                 dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
//             } else if (!selectedNetworkId) {
//                 dispatch({ type: GET_NETWORK_ID_APPEND_DATA_SUCCESS, payload: networkId });

//                 dispatch({ type: GET_FILTERED_COMPLETE_POST_DATA_SUCCESS, payload: newData, filterNetworkId: networkId });

//                 dispatch({ type: SET_HAS_MORE_DATA, payload: { [networkId]: { hasMoreData: Object.keys(newData).length < postCount ? false : true, after: response.data.after } } });
//                 dispatch({ type: GET_APPEND_DATA_SUCCESS, payload: { after: response.data.after, networkID: networkId, heightEvent: heightEvent }, filterNetworkId: networkId });
//                 dispatch({ type: GET_WEB_FILTER_LOADER_SUCCESS, payload: false });
//             }

//             dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: false });
//         })
//             .catch((error) => { })
//     }

// }

/* Used to append data once click on ShowMore Button */
export const filterPostDataAppendShowMore = (wallID, timeStamp, postCount, networkId, after, postData, imageList) => {
    return (dispatch) => {
        dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: true });
        new HttpClient().get(`${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/${after}/1/`).then((response) => {
            const newData = response.data.data
            dispatch({ type: GET_POST_DATA_SUCCESS, payload: newData, filterNetworkId: networkId, isSearch: false });
            dispatch({
                type: GET_APPEND_DATA_SUCCESS,
                payload: { after: response.data.after, networkID: networkId },
                filterNetworkId: networkId
            });
            dispatch({
                type: SET_HAS_MORE_DATA,
                payload: {
                    [networkId]: {
                        hasMoreData: Object.keys(newData).length < postCount ? false : true,
                        after: response.data.after
                    }
                }
            });
            dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: false });
        })
            .catch((error) => {
            })
    }
}

export const preRenderDataUpdateToParent = (postData) => {
    const selectedNetworkId = store.getState().postData.currentFilterNetworkId;
    const searchKeyword = store.getState().searchBar.searchKeyword;
    return (dispatch) => {
        dispatch({
            type: GET_POST_DATA_SUCCESS,
            payload: postData,
            filterNetworkId: selectedNetworkId,
            isPreRenderData: true,
            isSearch: searchKeyword ? true : false
        });
    }
}

export const getDataNextSteps = (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInState, imageList) => async (dispatch) => {
    const searchKeyword = store.getState().searchBar.searchKeyword;
    const searchText = searchKeyword ? `${searchKeyword}` : ``;
    const urlToAccess = `${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/${after}/1/${searchText}`;
    const urlsAccessed = store.getState().postData.urlsAccessed;
    const afterUsedList = store.getState().postData.afterUsedList;
    if (!afterUsedList.includes(after) || afterUsedList.length == 0 && !urlsAccessed.includes(urlToAccess)) {
        dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: true });
        dispatch({ type: SET_URLS_ACCESSED_FOR_DATA, payload: urlToAccess });
        await new HttpClient().get(urlToAccess).then((response) => {
            dispatch({
                type: GET_POST_DATA_SUCCESS,
                payload: response.data.data,
                filterNetworkId: networkId,
                isSearch: searchKeyword ? true : false
            });
            dispatch({
                type: GET_APPEND_DATA_SUCCESS,
                payload: { after: response.data.after, networkID: networkId, heightEvent: heightEvent },
                filterNetworkId: networkId
            });
            dispatch({
                type: SET_HAS_MORE_DATA,
                payload: { [networkId]: { hasMoreData: response.data.hasPost ? true : false, after: response.data.after } }
            });
            dispatch({ type: GET_THEME_SHOW_MORE_LOADER_SUCCESS, payload: false });
        }).catch((error) => {

        })
    }
}

export const filterPostDataAppendHorizontalSlider = (wallID, timeStamp, postCount, networkId, after, postData, renderSlider) => {
    return (dispatch) => {
        new HttpClient().get(`${GET_DATA_POST_APPEND}${wallID}/${timeStamp}/${postCount}/${networkId}/${after}/1/`).then((response) => {
            const newData = convertObjectToArray(response.data.data);
            dispatch({ type: GET_HORIZONTAL_POST_DATA_SUCCESS, payload: newData });
            dispatch({
                type: SET_HAS_MORE_DATA,
                payload: {
                    [networkId]: {
                        hasMoreData: newData.length < postCount ? false : true,
                        after: response.data.after
                    }
                }
            });
            dispatch({
                type: GET_APPEND_DATA_SUCCESS,
                payload: { after: response.data.after, networkID: networkId },
                filterNetworkId: networkId
            });
            renderSlider.slickNext();
        })
            .catch((error) => {
            })
    }

}
/* trial purpose for optimization */ 
/* export const saveNetworkIdOnFilter = (networkId) => (dispatch) => {
    dispatch({ type: GET_CURRENT_FILTER_ID, payload: networkId })
} */

export const setUrlAccessed = (url) => (dispatch) => {
    dispatch({ type: SET_URLS_ACCESSED_FOR_DATA, payload: url });
}

/* trial purpose for optimization */ 
/* export const filterStatePreRenderData = (networkId) => (dispatch) => {
    dispatch({ type: FILTER_ALERADY_SAVED_PRERENDERED_DATA, payload: { networkId: networkId } });
} */

export const searchTextUpdate = (text, Id, appendData) => (dispatch) => {
    dispatch({ type: SEARCH_KEYWORD, payload: text })
    const searchKeyword = text;
    const searchText = searchKeyword ? `/${searchKeyword}` : ``;
    const FETCH_URL = `${GET_WIDGET_DATA_API_PATH}${Id}${searchText}`
    dispatch({ type: GET_WALL_ID_SUCCESS, payload: Id });
    searchWallUpdate(dispatch, FETCH_URL, Id, appendData);
}

const searchWallUpdate = (dispatch, FETCH_URL, Id, appendData) => {
    dispatch({ type: GET_SEARCH_LOADER_SUCCESS, payload: true });
    new HttpClient().get(FETCH_URL).then((response) => {
        const {
            existEmbedUrl,
            after,
            announcements,
            customPost,
            postData,
            webFilters,
            errorData,
            post_message,
            older_days,
            older_post,
            loaderData,
            errorCode
        } = response.data;
        if (postData && Object.keys(postData).length == 0) {
            searchWallUpdate(dispatch, `${GET_WIDGET_DATA_API_PATH}${Id}`, Id, appendData);
        } else {
            if (parseInt(errorCode) == 404) dispatch({ type: ERROR_RESPONSE_WITH_MESSAGE, payload: response.data });
            else {
                dispatch({ type: GET_LOADER_SUCCESS, payload: response.data.loaderData });
                setTimeout(() => {
                    dispatch({ type: GET_WALL_SUCCESS, payload: loaderData.wall });
                    dispatch({
                        type: GET_LANGUAGE_SUCCESS,
                        payload: languageSettings(loaderData.wall.Personalization.w_language, loaderData.wall.Personalization.custom_lan_data)
                    });
                }, 700)
                dispatch({
                    type: GET_THEME_ERROR_SUCCESS,
                    payload: {
                        errorData: errorData,
                        post_message: post_message,
                        older_days: older_days,
                        older_post: older_post
                    }
                });
                //dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: announcements });
                // dispatch({ type: GET_CUSTOM_POST_DATA_SUCCESS, payload: customPost });
                dispatch({ type: GET_POST_DATA_SUCCESS_SEARCH, payload: postData });

                dispatch({ type: GET_THEME_WEB_FILTERS_SUCCESS, payload: convertObjectToArray(webFilters) });
                dispatch({
                    type: GET_APPEND_DATA_SUCCESS,
                    payload: { after: after, networkID: 0, heightEvent: appendData.heightEvent, filterNetworkId: 0 }
                });


                //dispatch({ type: GET_EMBED_URL_DATA, payload: convertObjectToArray(existEmbedUrl) });
            }
        }
        dispatch({ type: GET_SEARCH_LOADER_SUCCESS, payload: false });

    })
        .catch((error) => {
            dispatch({ type: GET_LOADER_ERROR });
            dispatch({ type: GET_WALL_ID_ERROR });
        })
}

export const setProcessingImageItems = (itemId) => (dispatch) => {
    dispatch({
        type: 'SET_RENEWING_ITEMS',
        payload: itemId
    })
}

