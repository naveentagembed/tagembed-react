import axios from 'axios';
import {API_URL} from './api'
import store from '../store';

const requestInterceptor = (config) => {
    let wallURL = {}
    const appState = store.getState();
    const wallId = appState.wallId.wallID;
    if (appState.wall.wallData !== null) {
        const ownerId = appState.wall.wallData.Wall.owner;
        if (appState.startEmbed && appState.startEmbed.heightEvent && appState.startEmbed.heightEvent.data !== undefined) {
            const embedUrl = appState.startEmbed.heightEvent.data.url
            wallURL = {url: embedUrl, wall: wallId, owner: ownerId}
        }
    }
    return {
        ...config,
        headers: {
            ...config.headers,
            ...wallURL

        },
    }
};

class HttpClient {
    constructor() {
        const options = {baseURL: API_URL + '/app/api/embedUrl/'};
        const instance = axios.create(options);
        instance.interceptors.request.use(requestInterceptor);
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
        return instance;
    }
}

export default HttpClient;