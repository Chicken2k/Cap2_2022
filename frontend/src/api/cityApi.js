import { message } from "antd";
import axiosClient from "./axiosClient";
class CityApi {
  getAll = () => {
    const url = "/v1/cities";
    return axiosClient.get(url);
  };
  create = (params) => {
    const url = "/v1/cities";

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
  delete = (id) => {
    const url = `/v1/cities/${id}`;
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
  edit = (params) => {
    const url = `/v1/cities/${params.idsua}`;
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
const cityApi = new CityApi();
export default cityApi;
