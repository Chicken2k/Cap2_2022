import axiosClient from "./axiosClient";

class AdminApi {
    getAll = () => {
        const url = '/v1/admin/restaurants';
        return axiosClient.get(url);
    };
}
const adminApi = new AdminApi();
export default adminApi;