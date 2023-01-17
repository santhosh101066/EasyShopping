import axios from "axios";


export const SERVER = process.env.REACT_APP_SERVER;

const AxiosApi= axios.create({
  baseURL: SERVER,
});


export default AxiosApi
