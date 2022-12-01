import axiosClient from "./axiosClient";

class AdminApi {
    getAll = () => {
        const url = '/v1/admin/restaurants';
        return axiosClient.get(url);
    };
    getRestaurantById = (id) => {
        const url=`/v1/admin/restaurant/${id}`;
        return axiosClient.get(url);
    }
    updateRestaurant = (id, body) => {
        const url=`/v1/admin/restaurant/${id}`;
        return axiosClient.patch(url, body);
    }
}
const adminApi = new AdminApi();
export default adminApi;