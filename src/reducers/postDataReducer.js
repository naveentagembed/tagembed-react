import {
    GET_POST_DATA_SUCCESS,
    GET_PRE_RENDER_POST_DATA_SUCCESS,
    GET_POST_DATA_ERROR,
    GET_HORIZONTAL_POST_DATA_SUCCESS,
    GET_FILTERED_COMPLETE_POST_DATA_SUCCESS,
    /* trial purpose for optimization */ 
    /* GET_CURRENT_FILTER_ID,*/
    GET_APPEND_DATA_SUCCESS,
     /* trial purpose for optimization */ 
    /*GET_APPEND_DATA__ERROR,*/
    GET_NETWORK_ID_APPEND_DATA_SUCCESS,
    GET_IFRAME_EVENT_SUCCESS,
    SET_FILTER_ALL,
    SET_HAS_MORE_DATA,
    SET_URLS_ACCESSED_FOR_DATA,
    GET_CUSTOM_POST_DATA_SUCCESS,
    EMBED_URL_FETCHED, /* GET_EMBED_URL_DATA,*/
    GET_POST_DATA_SUCCESS_SEARCH,
     /* trial purpose for optimization */ 
    /*GET_FILTERED_COMPLETE_POST_DATA_SUCCESS_SEARCH,*/
    UPDATE_REMOVE_DUPLICATE_FILTER,
    UPDATE_POPUP_EXPIRE_IMAGE,
} from './reducersKeys';

const initialState = {
    postData: [],
    completeData: [],
    preRender: {},
    appendData: {after: null, networkID: 0, heightEvent: null},
    completeDataObject: {},
    filteredDataObject: {},
    hasMoreData: {},
    urlsAccessed: [],
    customPostData: {},
    afterUsedList: [],
    getThemeDataWithWallID: [],
    allFilterData: [],
    renewingItems: [],
    removeDuplicate: [],
    // for google banner
    avgRating:0,
    avgpostRating:0,
    postlengthRating:0


};
export default function reducer(state = initialState, action) {
    const {type, payload, filterNetworkId, isPreRenderData, isSearch} = action;
    switch (type) {
        case GET_POST_DATA_SUCCESS:
        case GET_FILTERED_COMPLETE_POST_DATA_SUCCESS: {
            let filterId = filterNetworkId ? filterNetworkId : state.currentFilterNetworkId;
            if (!filterId) {
                filterId = 0;
            }
            let isSearchStatus = isSearch;
            let completeDataObject = state.completeDataObject;
            let filteredDataObject = state.filteredDataObject;
            let completeData = state.completeData;
            let customPostData = state.customPostData;
            let allFilterData = state.allFilterData;
            // for google banner
            let avgRating = state.avgRating;
            let avgpostRating = state.avgpostRating;
            let postlengthRating=state.postlengthRating;

            let newData = payload;

            if (isPreRenderData) {
                newData = state.preRender;
            }


            if (Object.keys(newData).length) {
                Object.keys(newData).forEach((key) => {
                    const item = newData[key];
                    if (!completeDataObject[item.id]) {
                        completeDataObject[item.id] = item;
                    }
                    if (filteredDataObject[item.network.id]) {
                        if (!filteredDataObject[item.network.id].includes(item.id)) {
                            filteredDataObject[item.network.id].push(item.id);
                        }
                    } else {
                        filteredDataObject[item.network.id] = [item.id]
                    }
                    if (!completeData.includes(item.id))
                        completeData.push(item.id);
                    if (filterId == 0) allFilterData.push(item.id)

                    // for google banner
                    if(item.network.id==4 || item.network.id==3 || item.network.id==19 || item.network.id==23 || item.network.id==28 || item.network.id==29 || item.network.id==33 || item.network.id==34 || item.network.id==35  && item.rating!=null){
                        
                        postlengthRating=parseInt(postlengthRating)+1;
                        avgpostRating=parseInt(avgpostRating)+ parseInt(item.rating)

                    }                   
                });
                
            }
// for google banner
avgRating=parseInt(avgpostRating)/parseInt(postlengthRating);

            
            const postData = (filterId && filteredDataObject[filterId]) ? filteredDataObject[filterId] : filterId == 0 ? isSearchStatus ? completeData : allFilterData : [];
            /* Custom Data */
            if (Object.keys(customPostData).length) {
                Object.keys(customPostData).forEach((key) => {
                    let item = customPostData[key];
                    const {status, after, every} = item.customPost;
                    if (status === 1) {
                        let customPostIndex = (parseInt(after) + parseInt(every))
                        for (customPostIndex; customPostIndex <= completeData.length; customPostIndex = customPostIndex + parseInt(every)) {
                            if (completeData.length > customPostIndex) {
                                if (completeData[customPostIndex] != item.id) completeData.splice(customPostIndex, 0, item.id);
                                if (!completeDataObject[item.id]) {
                                    completeDataObject[item.id] = item;
                                }
                            }
                        }
                    }
                })
            }
            return {
                ...state,
                completeDataObject,
                completeData,
                postData: [...postData],
                filteredDataObject: filteredDataObject,
                preRender: isPreRenderData ? [] : state.preRender,
                // for google banner
                avgRating
            }
        }
        case GET_CUSTOM_POST_DATA_SUCCESS: {
            return {...state, customPostData: action.payload}
        }
        case UPDATE_REMOVE_DUPLICATE_FILTER: {
            return {...state, removeDuplicate: action.payload}
        }
        case GET_PRE_RENDER_POST_DATA_SUCCESS: {
            return {...state, preRender: {...state.preRender, ...action.payload}}
        }
        case GET_POST_DATA_ERROR: {
            return {...state, postData: [], completeData: []}
        }

        case UPDATE_POPUP_EXPIRE_IMAGE: {
            return {...state, postData: action.payload, completeData: action.payload}
        }
        case GET_HORIZONTAL_POST_DATA_SUCCESS: {
            return {...state, postData: action.payload, completeData: action.payload}
        }
        // case GET_EMBED_URL_DATA: {
        //     return { ...state, getThemeDataWithWallID: action.payload }
        // }

        /* trial purpose for optimization */ 
        /* case GET_CURRENT_FILTER_ID: {
            return {
                ...state,
                currentFilterNetworkId: action.payload,
                appendData: {...state.appendData, networkID: action.payload}
            }
        } */
        case GET_APPEND_DATA_SUCCESS: {
            let appendData = {
                after: action.payload.after,
                networkID: action.payload.networkID,
                heightEvent: action.payload.heightEvent ? action.payload.heightEvent : state.appendData.heightEvent
            }
            return {...state, appendData}
        }
        case GET_NETWORK_ID_APPEND_DATA_SUCCESS: {
            let appendData = {after: state.appendData.after, networkID: action.payload}
            return {
                ...state,
                appendData,
                postData: state.filteredDataObject[action.payload] ? state.filteredDataObject[action.payload] : []
            }
        }
         /* trial purpose for optimization */ 
        // case GET_APPEND_DATA__ERROR: {
        //     return {...state, appendData: {after: null, networkID: 0}}
        // }
        case GET_IFRAME_EVENT_SUCCESS: {
            let appendData = {
                after: state.appendData.after,
                networkID: state.appendData.networkID,
                heightEvent: action.payload
            }
            return {...state, appendData}
        }
        case SET_FILTER_ALL: {
            let appendData = {after: state.appendData.after, networkID: 0, heightEvent: state.appendData.heightEvent}
            let allFilterData = state.allFilterData;
            const postData = (allFilterData && allFilterData.length > 0) ? allFilterData : state.completeData;
            return {...state, postData: postData, networkID: 0, appendData}
        }
        case SET_HAS_MORE_DATA: {
            return {
                ...state,
                hasMoreData: {...state.hasMoreData, ...payload}
            }
        }
        case SET_URLS_ACCESSED_FOR_DATA: {
            return {
                ...state,
                urlsAccessed: [...state.urlsAccessed, payload],
                afterUsedList: [...state.afterUsedList, state.appendData.after]
            }
        }
        case EMBED_URL_FETCHED: {
            return {...state, originUrl: action.payload.data.url};
        }
        case GET_POST_DATA_SUCCESS_SEARCH:
        /* trial purpose for optimization */ 
        // case GET_FILTERED_COMPLETE_POST_DATA_SUCCESS_SEARCH: {
        //     let filterId = filterNetworkId ? filterNetworkId : state.currentFilterNetworkId;
        //     if (!filterId) {
        //         filterId = 0;
        //     }

        //     let completeDataObject = [];
        //     let filteredDataObject = [];
        //     let completeData = [];
        //     let customPostData = [];

        //     let newData = payload;
        //     if (isPreRenderData) {
        //         newData = state.preRender;
        //     }
        //     if (Object.keys(newData).length) {
        //         Object.keys(newData).forEach((key) => {
        //             const item = newData[key];
        //             if (!completeDataObject[item.id]) {
        //                 completeDataObject[item.id] = item;
        //             }

        //             if (filteredDataObject[item.network.id]) {
        //                 if (!filteredDataObject[item.network.id].includes(item.id)) {
        //                     filteredDataObject[item.network.id].push(item.id);
        //                 }
        //             } else {
        //                 filteredDataObject[item.network.id] = [item.id]
        //             }
        //             if (!completeData.includes(item.id))
        //                 completeData.push(item.id);

        //         });
        //     } else {
        //         completeDataObject = [];
        //         filteredDataObject = [];
        //         completeData = [];
        //         customPostData = [];
        //     }
        //     const postData = (filterId && filteredDataObject[filterId]) ? filteredDataObject[filterId] : filterId == 0 ? completeData : [];
        //     /* Custom Data */
        //     if (Object.keys(customPostData).length) {
        //         Object.keys(customPostData).forEach((key) => {
        //             let item = customPostData[key];
        //             const {status, after, every} = item.customPost;
        //             if (status === 1) {
        //                 let customPostIndex = (parseInt(after) + parseInt(every))
        //                 for (customPostIndex; customPostIndex <= completeData.length; customPostIndex = customPostIndex + parseInt(every)) {
        //                     if (completeData.length > customPostIndex) {
        //                         if (completeData[customPostIndex] != item.id) completeData.splice(customPostIndex, 0, item.id);
        //                         if (!completeDataObject[item.id]) {
        //                             completeDataObject[item.id] = item;
        //                         }
        //                     }
        //                 }
        //             }
        //         })
        //     }
        //     return {
        //         ...state,
        //         completeDataObject,
        //         completeData,
        //         postData: postData,
        //         filteredDataObject: filteredDataObject,
        //         preRender: isPreRenderData ? [] : state.preRender
        //     }
        // }
        case 'SET_RENEWING_ITEMS': {
            return {...state, renewingItems: [...state.renewingItems, payload]}
        }
        default:
            return {...state}
    }
}