import axiosClient from "./axiosClient";
import { message } from "antd";

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

    getAllNews = () => {
        const url = '/v1/admin/news';
        return axiosClient.get(url);
    }

    updateNews = (id) => {
        const url = `/v1/admin/news/${id}`;
        return axiosClient.patch(url).then(data => {
            message.success("Duyệt tin tức thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const adminApi = new AdminApi();
export default adminApi;