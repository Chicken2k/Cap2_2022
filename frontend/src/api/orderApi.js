import { message } from "antd";
import axiosClient from "./axiosClient";

class OrderApi {
  getAll = () => {
    const url = "/v1/order";
    return axiosClient.get(url);
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
  updateOrder = (orderId) => {
    const url =  `/v1/order/${orderId}`;
    return axiosClient.patch(url)
    .then(() => {
      message.success('Xác nhận thành công');
    });
  }

  deleteOrder = (orderId) => {
    const url = `/v1/order/${orderId}`;
    return axiosClient.delete(url)
    .then(() => {
      message.success('Từ chối bàn thành công');
    })
  }
}
const orderApi = new OrderApi();
export default orderApi;
