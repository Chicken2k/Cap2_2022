import { message } from "antd";
import axiosClient from "./axiosClient";

class GetUserApi {
    getUser = (params) => {
        const url = `/users/${params}`;
        return axiosClient.get(url);
    };
}
const getUserApi = new GetUserApi();
export default getUserApi;