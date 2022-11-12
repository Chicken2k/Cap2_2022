import { message } from "antd";
import axiosClient from "./axiosClient";

class ChudeApi {
    getAll = (params) => {
        const url = '/chudes';
        return axiosClient.get(url, { params });
    };
    postchude = (params) => {
        const url = '/chudes';
        return axiosClient.post(url, params).then(data => {
            message.success("Đặt vé thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletechude = (id) => {
        const url = `/chudes/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editchude = (params) => {
        const url = `/chudes/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    getallbinhluan = () => {
        const url = `/chudes`
        return axiosClient.get(url)
    }
}
const chudeApi = new ChudeApi();
export default chudeApi;