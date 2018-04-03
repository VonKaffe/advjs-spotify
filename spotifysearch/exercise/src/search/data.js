export default (searchType, data) => {
    let items;

    items = searchType === 'artist' ? data.artists.items : data.tracks.items;
    items = items.map((item) => ({
        name: item.name,
        link: item.uri,
        images: searchType === 'artist'
            ? item.images.map(image => image.url)
: item.album.images.map(image => image.url)
}));

    return items;
};