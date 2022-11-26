import { message } from "antd";
import axiosClient from "./axiosClient";

class RestaurantApi {
    getAll(query) {
        const url = `/v1/restaurants?userId=${query}`;
        return axiosClient.get(url);
    }
    createRestaurant(body) {
        const url = '/v1/restaurants';
        return axiosClient.post(url, { body });
    }
    updateRestaurant(id, body) {
        const url = `/v1/restaurants/${id}`;
        return axiosClient.patch(url, { body });
    }
    deleteRestaurant(id) {
        const url = `/v1/restaurants/${id}`;
        return axiosClient.delete(url);
    }
}

const restaurantApi = new RestaurantApi();
export default restaurantApi;