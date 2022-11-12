import { message } from "antd";
import axiosClient from "./axiosClient";

class BinhluanchudeApi {
    getAll = (params) => {
        const url = '/binhluanchudes';
        return axiosClient.get(url, { params });
    };
    postbinhluan = (params) => {
        const url = '/binhluanchudes';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletebinhluan = (id) => {
        const url = `/binhluanchudes/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editbinhluan = (params) => {
        const url = `/binhluanchudes/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    getallbinhluan = () => {
        const url = `/binhluanchudes`
        return axiosClient.get(url)
    }
}
const binhluanchudeApi = new BinhluanchudeApi();
export default binhluanchudeApi;