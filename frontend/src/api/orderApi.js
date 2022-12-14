import { message } from "antd";
import axiosClient from "./axiosClient";

class OrderApi {
  getAll = (params) => {
    const url = "/v1/order";
    return axiosClient.get(url, { params });
  };
  getOrderPending = (params) => {
    const url = "/v1/order/pending";
    return axiosClient.get(url, { params });
  };
  postOrder = (params) => {
    const url = "/v1/order";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Đặt vé thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  updateOrder = (orderId, userId) => {
    const body = {
      userId: userId,
    };
    const url = `/v1/order/${orderId}`;
    return axiosClient.patch(url, body).then(() => {
      message.success("Xác nhận thành công");
    });
  };

  deleteOrder = (orderId) => {
    const url = `/v1/order/${orderId}`;
    return axiosClient.delete(url).then(() => {
      message.success("Từ chối bàn thành công");
    });
  };

  getRestaurantOrder = (params) => {
    const url = `/v1/order/restaurant`;
    return axiosClient.get(url, { params });
  };
}
const orderApi = new OrderApi();
export default orderApi;
