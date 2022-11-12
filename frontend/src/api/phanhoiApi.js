import { message } from "antd";
import axiosClient from "./axiosClient";

class PhanhoiApi {
    getAll = (params) => {
        const url = '/phanhois';
        return axiosClient.get(url, { params });
    };
    postphanhoi = (params) => {
        const url = '/phanhois';
        return axiosClient.post(url, params).then(data => {
            message.success("Đặt vé thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletephanhoi = (id) => {
        const url = `/phanhois/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editphanhoi = (params) => {
        const url = `/phanhois/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const phanhoiApi = new PhanhoiApi();
export default phanhoiApi;