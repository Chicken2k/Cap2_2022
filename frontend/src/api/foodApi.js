import axiosClient from "./axiosClient";

class FoodApi {
  getAll = () => {
    const url = "/v1/food";
    return axiosClient.get(url);
  };
}
const foodApi = new FoodApi();
export default foodApi;
