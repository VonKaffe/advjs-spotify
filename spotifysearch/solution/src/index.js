import $ from 'jquery';

import eventManager from './event';
import { SearchEngine } from './search';
import { IMAGE_NA_URL } from './constants';

// ...

const searchEngine = new SearchEngine({
    authToken: 'BQDebl29UUy0B6BLJIpIOq9xGZqigQj0L0arRQgEUocSnoWqeG_Chw7DYcmwvSEyL6b_xmpwgjLPdmNGET634VoskjU6dKUqZa4Zgo-jrte6-3EAWESVrWT76pfDzs3uMpyqTO-KZB_rJ_CD'
});

// ...

eventManager.addSubscriber(
    'onSearch',
    ({ searchType, searchText }) => console.log(`Search: ${searchText} of type ${searchType}`)
)

eventManager.addSubscriber(
    'onSearch', 
    searchParams => {
        searchEngine.execute(searchParams)
            .then(searchResults => eventManager.notify('onSearchResults', searchResults))
            .catch(searchError => eventManager.notify('onSearchError', { searchParams, searchError }));
    }
)

eventManager.addSubscriber(
    'onSearchResults',
    searchResults => {
        searchResults.forEach(({ name, link, images }) => {
            $('#search-results').append(`
                <div class="search-result">
                    <div class="search-result-info">
                        <p>${name}</p>
                        <a href="${link}">Open in Spotify</a>
                    </div>
                    <img src="${images.length > 0 ? images[0] : IMAGE_NA_URL}" />
                </div>
            `);
        });
    }
)

eventManager.addSubscriber(
    'onSearchError',
    ({ searchParams, searchError}) => {
        alert(`Error occurred when searching for '${searchParams.searchText}' - ${searchError.message}`);
    }
)

// ...

$("#search-text").keyup((event) => {
    if (event.keyCode == 13) {
        $("#search-start").trigger('click');
    }
})

$('#search-start').click(() => {
    $('.search-result').remove();
    
    const searchType = $('#search-type').val();
    const searchText = $('#search-text').val();

    eventManager.notify('onSearch', {
        searchType,
        searchText
    });
}); 