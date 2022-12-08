import { message } from "antd";
import axiosClient from "./axiosClient";

class NewsApi {
    getAll() {
        const url = '/v1/news';
        return axiosClient.get(url);
    }
    createNews(body) {
        const url = '/v1/news';
        return axiosClient.post(url, body);
    }
}
const newsApi = new NewsApi();
export default newsApi;