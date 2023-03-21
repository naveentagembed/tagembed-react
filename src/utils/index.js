import { isMobile, isTablet } from "react-device-detect";
import axios from 'axios';
import store from "../store";
import { setProcessingImageItems } from "../actions/themeActions";
import queryString from 'query-string';


export let updateImage = []
const addScript = url => {
    const script = document.createElement("script")
    script.src = url
    script.async = true
    document.body.appendChild(script)
}
const addLink = url => {
    const link = document.createElement("link")
    link.href = url
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.body.appendChild(link)
}

export const scriptAndLink = () => {
    addLink("https://s3.us-west-1.wasabisys.com/cdn.tagembed.com/fonts/fonts.css")
    addLink("https://s3.us-west-1.wasabisys.com/cdn.tagembed.com/fonts/font-awesome.min.css")
    addScript("https://cdn.tagembed.com/app/js/slackdown.js?v=1.0.1")
}

export const onGetWallID = () => {
    let hostUrl = window.location.href
    let wallID = new URL(hostUrl);
   
    wallID = String(wallID.pathname).toLowerCase();
    wallID = wallID.split("/");
  
    wallID = wallID.pop();
  

    if(String(wallID).includes("?viewURL")) return String(wallID).replace("?viewURL","")
    else if(String(wallID).includes("?wix")) return String(wallID).replace("?wix","")
    else if(String(wallID).includes("?view")) return String(wallID).replace("?view","")
    else return wallID
   
    //return window.wallUrl;
}

// export const getWallID = () => {
//     // const parsed = queryString.parse(window.location.search);
//     // if (parsed.wall_id) return parsed.wall_id;
//     if (window.wallUrl) return window.wallUrl;
//     else {
//         var container = document.getElementsByClassName('tagembed-socialwall');
//         for (var i = 0; i < container.length; i++) {
//             if (container[i].getAttribute("data-is-load") == "0") {
//                 const updateData = document.getElementById(`co_${container[i].getAttribute("data-render-id")}`)
//                 if (updateData) {
//                     updateData.setAttribute("data-is-load", "1")
//                 }
//                 return container[i].getAttribute("data-wall-id")
//             }
//         }
//     }
// }




export const getWallID = () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.wall_id) return parsed.wall_id;
    else if (window.wallUrl) return window.wallUrl;
    else if(window.location.href && String(window.location.href).includes("viewURL") || String(window.location.href).includes("wix") || String(window.location.href).includes("view") && onGetWallID())return onGetWallID()
    else if(window.location.href && String(window.location.href).includes("widget.tagembed")){
        const splitURL = "https://widget.tagembed.com/"
        const wallGet = window.location.href.split(splitURL)
        if (wallGet && wallGet.length > 0 && wallGet[1]) {
            if (!wallGet[1].includes("?")) return wallGet[1];
            else if (wallGet[1].includes("?")) {
                const updateWall = wallGet[1].split("?")
                if (updateWall && updateWall.length > 0 && updateWall[0]) {
                    return updateWall[0];
                }
                else return window.wall_Id
            }
            else return window.wall_Id
        }

    }
    else {
        var socialwall = document.getElementsByClassName('tagembed-socialwall').length
        var container = socialwall && socialwall > 0 ? document.getElementsByClassName('tagembed-socialwall') : document.getElementsByClassName('tagembed');
        for (var i = 0; i < container.length; i++) {
            if (container[i].getAttribute("data-is-load") == "0") {
                const updateData = document.getElementById(`co_${container[i].getAttribute("data-render-id")}`)
                if (updateData) {
                    updateData.setAttribute("data-is-load", "1")
                }
                return socialwall && socialwall > 0 ? container[i].getAttribute("data-wall-id") : container[i].getAttribute("data-widget-id")
            }

        }
    }
}









// changes for Iframe
export const getRenderContainer = () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.wall_id) return document.getElementById('tagembed_main');
 else if (window.wallUrl) return document.getElementById('tagembed_main');
 else if(window.location.href && String(window.location.href).includes("viewURL") || String(window.location.href).includes("wix") || String(window.location.href).includes("view") && onGetWallID())return document.getElementById('tagembed_main');
 else if (window.location.href && window.location.href.includes("widget.tagembed")) return document.getElementById('tagembed_main');

    else return extendsGetRenderContainer()
}
 // changes for Iframe

 export let rID;


const extendsGetRenderContainer = () => {
    try {
        var container = document.getElementsByClassName('tagembed-socialwall');
        for (var i = 0; i < container.length; i++) {
            if (container[i].getAttribute("data-is-load") == "0") {
                if (container[i].getAttribute('data-is-load')) rID = container[i].getAttribute('data-render-id')
                return document.getElementById(container[i].getAttribute("data-render-id"))
            }
        }
    }
    catch (ex) {
        return document.getElementById('tagembed_main');
    }
}






const adjustCardNumberSpaing = (windowWidth, adjustMinimumPostWidth) => {
    let cardNumber = 0;
    let adjustSpacing = null;
    let spacing = null;
    cardNumber = (windowWidth) / (adjustMinimumPostWidth)
    let rowCard = Math.trunc(cardNumber)
    spacing = (windowWidth) % adjustMinimumPostWidth
    adjustSpacing = spacing / rowCard;
    return { cardNumber, adjustSpacing, spacing, rowCard }
}

const cardMobileCount = (wall) => {
    if (isMobile && !isTablet) {
        if (wall.Personalization.columnCountMobile !== 'undefined') {
            wall.Personalization.columnCount = wall.Personalization.columnCountMobile;
        } else {
            wall.Personalization.columnCount = 0;
        }
    }
    return wall;
}

/*==================================RESPONSIVE THEME/*================================== */
const getDevidedValue = (value1, value2) => value1 / value2;

const postWidthAdjustSpacing = (cardNumber, rowCard, windowWidth, postWidth) => {
    let spacing = null; let width = null; let adjustSpacing = null;
    spacing = (windowWidth) % postWidth;
    adjustSpacing = spacing / rowCard;
    if (cardNumber >= 1) width = (postWidth + adjustSpacing);
    else width = (postWidth - adjustSpacing);
    return { spacing, width, adjustSpacing }
}
export const THEME_WIDTH_ADJUSTMENT_MODERN = (windowWidth, wall) => {
   
    let cardNumber = null; let adjustWidth = null;
        let numberOfCoumn = (isMobile || windowWidth < 768) ? parseInt(wall.Personalization.columnCountMobile) : parseInt(wall.Personalization.columnCount)
        let squareThemeColumn = parseInt(numberOfCoumn) > 0 ? true : parseInt(windowWidth) > parseInt(wall.Personalization.minimumPostWidth) ? true : false;
        if (squareThemeColumn) {
            let singlePostWidth = parseInt(numberOfCoumn) > 0 ? (((windowWidth) / (numberOfCoumn))) : wall.Personalization.minimumPostWidth;
            if (windowWidth < 768 && numberOfCoumn == 0) singlePostWidth = (singlePostWidth)
            cardNumber = getDevidedValue(windowWidth, singlePostWidth);
            const { width } = postWidthAdjustSpacing(cardNumber, Math.trunc(cardNumber), windowWidth, singlePostWidth);
            let scrollBarWidth=0;
            if(cardNumber>0){
                scrollBarWidth=6/cardNumber;
            }
            else {
                scrollBarWidth=6
            }
            adjustWidth = width;
            adjustWidth = (numberOfCoumn > 0 ? singlePostWidth : adjustWidth) - (0.8 + scrollBarWidth);
            return { adjustWidth, cardNumber };
        }
        else return { adjustWidth: windowWidth, cardNumber: 1 }
    }
   

export const onResponsiveModernCardTheme = (windowWidth, wall) => {

    let adjustWidth = null;
    let adjustLeft = 0;
    let adjustMinimumPostWidth = wall.Personalization.minimumPostWidth;
    /*--Start Mange Card View In Mobile*/
    wall = cardMobileCount(wall);
    /*--End Mange Card View In Mobile*/
    if (wall.Personalization.columnCount > 0) adjustMinimumPostWidth = (windowWidth) / (wall.Personalization.columnCount)
    let { cardNumber, adjustSpacing } = adjustCardNumberSpaing(windowWidth, adjustMinimumPostWidth);
    if (wall.Personalization.columnCount > 0) adjustWidth = (adjustMinimumPostWidth)
    else {
        if (cardNumber >= 1) adjustWidth = (adjustMinimumPostWidth) + adjustSpacing;
        else adjustWidth = (adjustMinimumPostWidth);
    }

    if (wall.Personalization.columnCount > 0) {
        const value = parseFloat(adjustWidth).toFixed(2) * wall.Personalization.columnCount;
        const getValueFromwindow = windowWidth - value;
        adjustLeft = (getValueFromwindow) / 2;
        const adSpace = 6 / wall.Personalization.columnCount;
        adjustWidth = adjustWidth - adSpace;
    } else adjustWidth = (adjustWidth - 1);
    adjustWidth=adjustWidth-(6/cardNumber)
    
    return { adjustWidth: parseInt(adjustWidth), adjustLeft: parseFloat(adjustLeft).toFixed(2) }
}

export const dataUpdate = async (e) => {
    var items = document.querySelectorAll("img");
    e.target.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
    e.target.setAttribute("data-preload", "1");
    for (var i = items.length; i--;) {
        var img = items[i];
        const dataPreload = img.getAttribute("data-preload")
        if (dataPreload == 1) {
            await loopUpdateDataImage(img)
        }
    }
}

export const loopUpdateDataImage = async (e) => {
    const networkId = e.getAttribute("data-network")
    const wallId = e.getAttribute("data-wall-id")
    const postId = e.getAttribute("data-item-id")
    const planId = e.getAttribute("data-plan-id")
    const feedId = e.getAttribute("data-feed-id")
    const procssingItems = store.getState().postData.renewingItems;
    if (procssingItems.indexOf(postId) < 0) {
        store.dispatch(setProcessingImageItems(postId));
        if (networkId) {

            e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;

            if ((networkId == 2 || networkId == 18 || networkId == 3 || networkId == 10 || networkId == 31) && e.getAttribute("data-load") == 0) {
                await axios.post('https://api.tagembed.com/app/expost/updateexpirypost', {
                    wallId: wallId,
                    postId: postId,
                    networkId: networkId,
                    planId: planId,
                    feedId: feedId,
                }).then(({ data }) => {
                    if (data.status) {
                        e.src = data.data.imageUrl;
                        e.attributes["data-load"].value = "0";
                        e.setAttribute("data-preload", "0")
                    } else {
                        e.attributes["data-load"].value = "1";
                        e.onerror = null;
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                        e.setAttribute("data-preload", "0")
                    }

                })
                    .catch(function (error) {
                        e.setAttribute("data-preload", "0")
                        e.attributes["data-load"].value = "1";
                        e.onerror = null;
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                    })
            } else {
                e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                e.setAttribute("data-preload", "0")
            }
        }
    }
}


// NEW CODE
var popimg = [];

export const dataUpdates = e => {
    // e.target.setAttribute("data-preload", "1");
    // for (var i = items.length; i--;) {
    //     var img = items[i];
    //     const dataPreload = img.getAttribute("data-preload")

    // }
    // const dataPreload = encodeURIComponent.target.getAttribute("data-preload")
    // if (dataPreload == 1) {
    // console.log("check check");
    //await loopUpdateDataImages(e)
    //}
    const networkId = e.target.getAttribute("data-network")
    const wallId = e.target.getAttribute("data-wall-id")
    const postId = e.target.getAttribute("data-item-id")
    const planId = e.target.getAttribute("data-plan-id")
    const popId = e.target.getAttribute("data-pop-id")
    const feedId = e.target.getAttribute("data-feed-id") 
    // const procssingItems = store.getState().postData.renewingItems;
    // console.log("data", procssingItems);
    // if (procssingItems.indexOf(postId) < 0) {
    //     store.dispatch(setProcessingImageItems(postId));
    if (networkId && !(popimg.includes(popId))) {
        //console.log("popId", popId);
        popimg.push(popId);
     
        e.target.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;

        if ((networkId == 2 || networkId == 18 || networkId == 3 || networkId == 10 || networkId == 31) && e.target.getAttribute("data-load") == 0) {
            axios.post('https://api.tagembed.com/app/expost/updateexpirypost', {
                wallId: wallId,
                postId: postId,
                networkId: networkId,
                planId: planId,
                popId: popId,
                feedId: feedId,
            }).then(({ data }) => {
               
                // console.log("new", data.status);
                if (data.status) {
                    e.target.src = data.data.imageUrl;
                    // console.log("data", data.data.imageUrl);
                    e.target.attributes["data-load"].value = "0";
                    e.target.setAttribute("data-preload", "0")
                   
                }
                 else {
                    e.target.attributes["data-load"].value = "1";
                    e.target.onerror = null;
                    e.target.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                    e.target.setAttribute("data-preload", "0")
                }
               
            })
            
                .catch(function (error) {
                    e.target.setAttribute("data-preload", "0")
                    e.target.attributes["data-load"].value = "1";
                    e.target.onerror = null;
                    e.target.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                })
        } else {
            e.target.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
            e.target.setAttribute("data-preload", "1")
        }
    }
    //}
}

// export const loopUpdateDataImages = async (e) => {
//     const networkId = e.getAttribute("data-network")
//     const wallId = e.getAttribute("data-wall-id")
//     const postId = e.getAttribute("data-item-id")
//     const planId = e.getAttribute("data-plan-id")
//     const procssingItems = store.getState().postData.renewingItems;
//     if (procssingItems.indexOf(postId) < 0) {
//         store.dispatch(setProcessingImageItems(postId));
//         if (networkId) {

//             e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;

//             if ((networkId == 2 || networkId == 18 || networkId == 3 || networkId == 10 || networkId == 31) && e.getAttribute("data-load") == 0) {
//                 await axios.post('https://web.tagembed.com/app/post/updateexpirypost', {
//                     wallId: wallId,
//                     postId: postId,
//                     networkId: networkId,
//                     planId: planId
//                 }).then(({data}) => {
//                     if (data.status) {
//                         e.src = data.data.imageUrl;
//                         e.attributes["data-load"].value = "0";
//                         e.setAttribute("data-preload", "0")
//                     } else {
//                         e.attributes["data-load"].value = "1";
//                         e.onerror = null;
//                         e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
//                         e.setAttribute("data-preload", "0")
//                     }

//                 })
//                     .catch(function (error) {
//                         e.setAttribute("data-preload", "0")
//                         e.attributes["data-load"].value = "1";
//                         e.onerror = null;
//                         e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
//                     })
//             } else {
//                 e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
//                 e.setAttribute("data-preload", "0")
//             }
//         }
//     }
// }

export const loopUpdateDataVideo = async (e) => {
    const networkId = e.target.getAttribute("data-network")
    const wallId = e.target.getAttribute("data-wall-id")
    const postId = e.target.getAttribute("data-item-id")
    const planId = e.target.getAttribute("data-plan-id")
    const feedId = e.target.getAttribute("data-feed-id")
    const procssingItems = store.getState().postData.renewingItems;
    // console.log(procssingItems)
    if (procssingItems.indexOf(postId) < 0) {
        store.dispatch(setProcessingImageItems(postId));

        if (networkId) {
            if (networkId == 2 || networkId == 18 || networkId == 3 || networkId == 31) {
                await axios.post('https://api.tagembed.com/app/expost/updateexpirypost', {
                    wallId: wallId,
                    postId: postId,
                    planId: planId,
                    networkId: networkId,   // new code
                    feedId: feedId
                }).then(({ data }) => {
                    if (data.status) {
                        e.target.src = data.data.videoUrl;
                    } else {
                        e.onerror = null;
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                    }

                })
                    .catch(function (error) {
                        e.onerror = null;
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
                    })
            } else {
                e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;
            }
        }
    }
}


// for expiry post on card while popup is off 
export const dataUpdate1 = e => {	
    const networkId = e.target.getAttribute("data-network")	
    const wallId = e.target.getAttribute("data-wall-id")	
    const postId = e.target.getAttribute("data-item-id")	
    const planId = e.target.getAttribute("data-plan-id")
    const feedId = e.target.getAttribute("data-feed-id")	
    const procssingItems = store.getState().postData.renewingItems;	
    if (procssingItems.indexOf(postId) < 0) {	
        store.dispatch(setProcessingImageItems(postId));	
        if (networkId) {	
            //e.target.poster = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
            if ((networkId == 2 || networkId == 18 || networkId == 3 || networkId == 10 || networkId == 31) && e.target.getAttribute("data-load") == 0) {	
                 axios.post('https://api.tagembed.com/app/expost/updateexpirypost', {	
                    wallId: wallId,	
                    postId: postId,	
                    networkId: networkId,	
                    planId: planId,
                    feedId: feedId	
                }).then(({ data }) => {	
            //console.log("new", data.status);	
                    if (data.status) {	
                        e.target.src = data.data.videoUrl;	
                        e.target.poster = data.data.imageUrl;	
                        e.target.attributes["data-load"].value = "0";	
                        e.target.setAttribute("data-preload", "0")	
                    } else {	
                        //e.target.attributes["data-load"].value = "1";	
                        e.target.onerror = null;	
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                        e.target.poster = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                        e.target.setAttribute("data-preload", "0")	
                    }	
                })	
                    .catch(function (error) {	
                        //e.target.setAttribute("data-preload", "0")	
                        //e.target.attributes["data-load"].value = "1";	
                        e.target.onerror = null;	
                        e.target.poster = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                        e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                    })	
            } else {	
                e.target.poster = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                e.src = `https://cdn.tagembed.com/app/image/blur-img.jpg`;	
                e.target.setAttribute("data-preload", "0")	
            }	
        }	
    }	
}