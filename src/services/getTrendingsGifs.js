
import { API_KEY, API_URL} from './settings'

export const getTrendingsGifs = ({ keyword } = { }) => {
    const API = `${API_URL}/trending/searches?api_key=${API_KEY}`
    return fetch(`${API}`)
        .then(resp => resp.json())
        .then(resp => {
            const { data = [] } = resp;
            /*const gifs = data.map(image => {
                const { images, title, id } = image;
                const { url } = images.downsized_medium;
                return { title, id, url }
            });*/
            return (data)
        })
}