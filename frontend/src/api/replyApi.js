import { message } from "antd";
import axiosClient from "./axiosClient";
class CommentApi {
  getAll = () => {
    const url = "/v1/reply";
    return axiosClient.get(url);
  };
  getOne = (id) => {
    const url = `/v1/reply/${id}`;
    return axiosClient.get(url);
  };
  postreply = (params) => {
    const url = "/v1/reply";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Trả lời thành công!");
      })
      .catch((err) => {
        console.log(err, err.message);
        message.error("Có lỗi xảy ra!");
      });
  };
}
const commentApi = new CommentApi();
export default commentApi;
