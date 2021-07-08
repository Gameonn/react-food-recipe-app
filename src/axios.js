import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
});

export default instance;
