const URL = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=mexico&api_key=6f841e0b39cbd1c1f020d068be91f2ff&format=json';
const deezerAPI = 'https://api.deezer.com/artist/';
const lastfmAPI = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=';

function getMusicData() {
    return fetch(`${URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => data.topartists.artist)
        .then(artists => {
            return Promise.all(artists.map(artist => {
                const artistName = artist.name;

                // Realizar la solicitud a la API de Deezer solo si los nombres coinciden
                if (artistName) {
                    return fetch(`${deezerAPI}${artistName}`)
                        .then(response => response.json())
                        .then(deezerData => ({
                            id: artist.mbid,
                            name: artistName,
                            image: deezerData.picture_medium
                        }))
                        .catch(() => ({
                            id: artist.mbid,
                            name: artistName,
                            image: artist.image[1]['#text']
                        }));
                } else {
                    return {
                        id: artist.mbid,
                        name: artistName,
                        image: null // Manejar el caso de falta de nombre
                    };
                }
            }));
        });
}

function getArtist(artistName) {
    const artistInfoURL = `${lastfmAPI}${encodeURIComponent(artistName)}&api_key=6f841e0b39cbd1c1f020d068be91f2ff&format=json`;

    return fetch(artistInfoURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.artist;
        })
        .catch(error => {
            console.error('Error fetching artist info:', error);
            return null;
        });
}

export { getMusicData, getArtist };
