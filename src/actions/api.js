const IS_LIVE = true;
export const API_URL = IS_LIVE ? 'https://web.tagembed.com/' : 'http://192.168.43.68:3000/';
export const LIVE_URL = IS_LIVE ? 'app' : 'reactWeb';
export const API_OPT = IS_LIVE ? 'app' : 'reactWeb';
export const GET_WIDGET_DATA_API_PATH = `${API_URL}${API_OPT}/api/wall/`
export const GET_DATA_POST_APPEND = `${API_URL}${API_OPT}/post/append/`
export const GET_DATA_EMBED_URL = `${API_URL}${API_OPT}/api/embedUrl/`
export const CLOUD_URL = `https://cdn.tagembed.com/common`
