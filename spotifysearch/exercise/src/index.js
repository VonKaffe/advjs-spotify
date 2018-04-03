import $ from 'jquery';

import eventManager from './event';
import { SearchEngine } from './search';
import { IMAGE_NA_URL } from './constants';

// ...

const searchEngine = new SearchEngine({
    authToken: 'BQCEepjHKFSC4LDCwOgIA0dO7MR3ZK4YNlgmbv8C73q7r1lscwhKuXmHPu0itwdqOGxEecRW_0CT9XEfc2RqHfXwZN'
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