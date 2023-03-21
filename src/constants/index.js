/* import $ from 'jquery' */

export const reactStringReplace = require('react-string-replace');
export const errorBg = 'https://cdn.tagembed.com/app/img/nopost.png'
export const CUSTOM_SERVER_PATH = "https://tagembed.s3.amazonaws.com/";
export const defaultFinalPath = "https://app.tagembed.com/uploaded/8661481540843.08240.jpg"
export const FILE_PATH = "https://app.tagembed.com/"
export const FILE_PATHWAY = "https://cdn.tagembed.com/app/"
export const ERROR_BACKGROUND_IMG = `https://cdn.tagembed.com/app/img/nopost.png`;
export const ERROR_ERROR = {
    '1': '@',
    '2': '#',
    '3': 'List ',
    '4': '@',
    '5': 'Advanced ',
    '6': 'Location ',
    '7': '@',
    '8': 'Page ',
    '9': 'Page ',
    '10': 'Group ',
    '11': 'Playlist ',
    '12': 'Board ',
    '13': 'URL ',
    '14': 'Event ',
    '16': 'Mention ',
    '22': 'Workplace ',
    '23': '@',
    '24': '@',
    '25': '@',
    '26': '#',
    '65': 'Album', '67': 'Page', '53': 'Group ', '54': 'Topic ', '33': 'Place ', '63': 'Search ', '64': 'Sticker '
}
export const noPostErrorDisplayCss = (errorCode, err) => {
    return errorCode === 201 ? ''
        : errorCode === 202 ? ''
            : errorCode === 203 ? ''
                : errorCode === 204 ? ''
                    : errorCode === 205 ? ''
                        : errorCode === 206 ? ''
                            : errorCode === 207 ? ''
                                : errorCode === 208 ? ''
                                    : errorCode === 209 ? ''
                                        : errorCode === 211 ? ''
                                            : errorCode === 212 ? ''
                                                : err === 404 ? ''
                                                    : 'none'
}
export const renderScreenSize = (widgetTheme, highlight, isMobile, isTablet, adjustWidth, cardWidth, columnCount) => {
    let screen = (isMobile && !isTablet) ? 'isMobile' : 'default';


    switch (screen) {
        case 'isMobile': {
            if (widgetTheme === 4 || widgetTheme === 50) return highlight === 1 ? (adjustWidth * 2) : (adjustWidth >= cardWidth) ? adjustWidth : adjustWidth;
            else if (columnCount > 0) return (adjustWidth >= cardWidth) ? adjustWidth : adjustWidth;
            else return '100%';

        }
        default:
            return highlight === 1 ? (adjustWidth * 2) : (adjustWidth >= cardWidth) ? adjustWidth : adjustWidth
    }

}

function jHeight(themeBanner,value) {
    if (value === undefined) {
      return themeBanner.clientHeight;
    } else {
        themeBanner.style.height = value;
    }
  }

  function jfilterStatusID(filterStatusID,value) {
    if (value === undefined) {
      return filterStatusID.clientHeight;
    } else {
        filterStatusID.style.height = value;
    }
  }




export const loaderTopHeightSetting = () => {
    let loaderTopStyle = 0;
   /* let themeBanner = $("#themeBanner").innerHeight();
    let filterStatusID = $("#filterStatusID").innerHeight(); */

    let themeBanner =  jHeight("#themeBanner");
    let filterStatusID = jfilterStatusID("#filterStatusID");

    if (themeBanner != undefined && parseInt(themeBanner) != 0) loaderTopStyle = parseInt(themeBanner);
    if (filterStatusID != undefined && parseInt(themeBanner) != 0) loaderTopStyle = loaderTopStyle + parseInt(filterStatusID);
    return loaderTopStyle > 150 ? loaderTopStyle : loaderTopStyle + 250;

}


export const rowsetting = (loaderData,postData) => {
    if (loaderData.wall.Personalization.widgetTheme===4 || loaderData.wall.Personalization.widgetTheme===3 || loaderData.wall.Personalization.widgetTheme===52) {
        if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 0 && loaderData.wall.Personalization.columnCount === 0) {
            loaderData.wall.Personalization.columnCount = 5;
        } else if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 0 && loaderData.wall.Personalization.columnCount === 2) {
            loaderData.wall.Personalization.columnCount = 2;
        }
        else if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 0 && loaderData.wall.Personalization.columnCount === 3) {
            loaderData.wall.Personalization.columnCount = 3;
        }
        else if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 0 && loaderData.wall.Personalization.columnCount === 4) {
            loaderData.wall.Personalization.columnCount = 4;
        }
        else if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 0 && loaderData.wall.Personalization.columnCount === 5) {
            loaderData.wall.Personalization.columnCount = 5;
        }
    }
    if (loaderData.wall.Personalization.widgetTheme===55) {
        if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.rowCount > 1 && loaderData.wall.Personalization.columnCount === 0 && postData && postData.length != 12) {
            loaderData.wall.Personalization.columnCount = 5;
            // bydefault is was 5 now given 6 due to slider theme responsive issue resolve
        } 
        else if (loaderData && loaderData.wall && loaderData.wall.Personalization && loaderData.wall.Personalization.columnCountMobile === 2 )
                    loaderData.wall.Personalization.columnCountMobile = 2;
    }
}

/* this will be true if using embed.min.js */


