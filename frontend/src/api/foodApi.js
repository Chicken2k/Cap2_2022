import { message } from "antd";
import axiosClient from "./axiosClient";
class FoodApi {
  getAll = () => {
    const url = "/v1/food";
    return axiosClient.get(url);
  };
  create = (params) => {
    const url = "/v1/food";

    return axiosClient
      .post(url, params)

      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        console.log(err, err.message);
        message.error("Có lỗi xảy ra!");
      });
  };
  deletefood = (id) => {
    const url = `/v1/food/${id}`;
    console.log(url);
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editfood = (params) => {
    const url = `/v1/food/${params.idsua}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        message.success("Sửa thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
}
const foodApi = new FoodApi();
export default foodApi;
