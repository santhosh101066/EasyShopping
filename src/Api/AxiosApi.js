import axios from "axios";

const DB = process.env.REACT_APP_DB;
export default axios.create({
  baseURL: DB,
  headers: {
    Authorization:
      localStorage.getItem("auth") && `Bearer ${localStorage.getItem("auth")}`,
  },
});
