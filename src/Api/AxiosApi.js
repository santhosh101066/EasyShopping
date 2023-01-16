import axios from "axios";


export const SERVER = process.env.REACT_APP_SERVER;

const AxiosApi= axios.create({
  baseURL: SERVER,
});

// AxiosApi.interceptors.response.use(undefined,(err)=>{
//   // Store.dispatch(notifyUser('test'))
//   return Promise.reject(err)
// })

export default AxiosApi
