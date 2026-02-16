import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}

const create = (noteObject) => {
    const response =  axios.post(baseUrl, noteObject);
    return response

}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const cancel = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`);
    return response
}

export default { getAll, create, update, cancel }