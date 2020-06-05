
import { API_KEY, API_URL } from './settings';

export const getGifs = ({ keyword = 'puppys', limit = 10, page = 0 } = {}) => {

    const API = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${limit * page}&lang=en`
    return fetch(`${API}`)
        .then(resp => resp.json())
        .then(resp => {
            const { data = [] } = resp;
            const gifs = data.map(image => {
                const { images, title, id } = image;
                const { url } = images.downsized_medium;
                return { title, id, url }
            });
            return (gifs)
        })
}