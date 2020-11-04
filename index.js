import { debounce } from './debounce.js'
// const getMovieData = async(searchTerm) => {
//     const response = await axios.get('http://www.omdbapi.com/', {
//         params: {
//             apikey: '3618b3e5',
//             s: searchTerm
//         }
//     });
//        come back and show user movie not found message on screen
//        if (data.Error) {
//            return []
//       }
//      return response.data.Search;
// };

const input = document.querySelector('input');

const getMovieBySearch = async(searchTerm) => {
    const apiKey = '3618b3e5';
    const search = searchTerm;
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
    const data = await response.json();

    //come back and show user movie not found message on screen
    if (data.Error) {
        return []
    }
    return data.Search;
};

const onInput = async event => {
    const movies = await getMovieBySearch(event.target.value);

    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').appendChild(div);
    }
};

input.addEventListener('input', debounce(onInput, 500));