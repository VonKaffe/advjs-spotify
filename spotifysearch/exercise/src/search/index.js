import { API_URL } from '../constants';
import processData from './data';

class SearchEngine {
    constructor({ authToken }) {
        this.authToken = authToken;
    }

    execute({ searchType, searchText }) {
        return fetch(API_URL + searchText + '&type=' + searchType, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            }
        })
            .then(res => {
            if (!res.ok) {
            throw Error(`Spotify: ${res.statusText} (${res.status})`)
        }

        return res.json();
    })
    .then(data => processData(searchType, data));
    }
}

export { SearchEngine };