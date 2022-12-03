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
}
const orderApi = new OrderApi();
export default orderApi;
