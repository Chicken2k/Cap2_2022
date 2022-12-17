import { message } from "antd";
import axiosClient from "./axiosClient";

class AdminApi {
  getAll = () => {
    const url = "/v1/admin/restaurants";
    return axiosClient.get(url);
  };
  getRestaurantById = (id) => {
    const url = `/v1/admin/restaurant/${id}`;
    return axiosClient.get(url);
  };
  updateRestaurant = (id, body) => {
    const url = `/v1/admin/restaurant/${id}`;
    return axiosClient
      .patch(url, body)
      .then((data) => {
        console.log(data);
        message.success("Duyệt tin tức thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };

  getAllNews = () => {
    const url = "/v1/admin/news";
    return axiosClient.get(url);
  };

  updateNews = (id) => {
    const url = `/v1/admin/news/${id}`;
    return axiosClient
      .patch(url)
      .then((data) => {
        message.success("Duyệt tin tức thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deleteNews = (id) => {
    const url = `/v1/admin/news/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Từ chối thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deleteRestaurant = (id) => {
    const url = `/v1/admin/restaurant/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Từ chối thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  getManageRestaurant = () => {
    const url = "/v1/admin/restaurants/all";
    return axiosClient.get(url);
  };
  getManageNew = () => {
    const url = "/v1/admin/news/all";
    return axiosClient.get(url);
  };
}
const adminApi = new AdminApi();
export default adminApi;
