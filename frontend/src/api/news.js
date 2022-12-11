import axiosClient from "./axiosClient";

class NewsApi {
  getAll(params) {
    const url = "/v1/news";
    return axiosClient.get(url, params);
  }
  getOne = (id) => {
    const url = `/v1/news/${id}`;
    return axiosClient.get(url);
  };
  createNews(body) {
    const url = "/v1/news";
    return axiosClient.post(url, body);
  }
}
const newsApi = new NewsApi();
export default newsApi;
