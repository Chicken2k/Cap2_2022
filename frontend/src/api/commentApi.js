import { message } from "antd";
import axiosClient from "./axiosClient";
class CommentApi {
  getAll = () => {
    const url = "/v1/comment";
    return axiosClient.get(url);
  };
  getOne = (id) => {
    const url = `/v1/comment/${id}`;
    return axiosClient.get(url);
  };
  postcomment = (params) => {
    const url = "/v1/comment";
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
}
const commentApi = new CommentApi();
export default commentApi;
