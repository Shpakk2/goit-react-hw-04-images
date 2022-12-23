import axios from 'axios';

export async function fetchData(searchQuery, page) {
    const API_KEY = "31407151-553822a8b7d25cc0b7cb87592"
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        page: page,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
    })

    const url = `https://pixabay.com/api/?${searchParams}`

    const response = await axios.get(url)
    if (response.status === 404) {
        alert("Отакої, зображень не знайдено")
        return Promise.reject()
    }

    return response
}
