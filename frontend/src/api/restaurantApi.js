import { message } from "antd";
import axiosClient from "./axiosClient";

class RestaurantApi {
    getAll(query) {
        const url = `/v1/restaurants?userId=${query}`;
        return axiosClient.get(url);
    }
}

const restaurantApi = new RestaurantApi();
export default restaurantApi;