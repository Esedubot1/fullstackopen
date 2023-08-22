import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newBlog => {
  const config = { headers: { Authorization: token } }
  
  const res = await axios.post(baseUrl, newBlog, config)  
  return res.data
}

export default { setToken, getAll, create }