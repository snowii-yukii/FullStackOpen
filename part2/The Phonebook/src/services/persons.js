import axios from 'axios'
const baseURL = 'https://phonebook-backend-fnh9.onrender.com/api/persons'

const get = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const post = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { get, post, remove, update }