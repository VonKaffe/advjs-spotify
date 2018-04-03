import _ from 'lodash';
import $ from 'jquery';

const YTSearch = require('youtube-api-v3-search');

// ...

const search = titleToSearch => {
    YTSearch(
        'your API key here...',
        {
            q: titleToSearch,
            maxResults: 10,
            type: 'video'
        },
        (err, results) => {
            if (err) {
                return console.log(err);
            }
            
            $('#videos').empty();

            const videos = results.items.map(item => ({ videoId: item.id.videoId }));
            videos.forEach(({ videoId }) => 
                $('#videos').append(`
                    <iframe src="https://www.youtube.com/embed/${videoId}" />
                `)
            );
        }
    )
};

const debouncedSearch = _.debounce(search, 300);

// ...

$('#videoTitle').on('keyup', e => {
    const titleToSearch = e.target.value;

    debouncedSearch(titleToSearch);
})