import axiosClient from "./axiosClient";

class CityApi {
  getAll = () => {
    const url = "/v1/cities";
    return axiosClient.get(url);
  };
}
const cityApi = new CityApi();
export default cityApi;
