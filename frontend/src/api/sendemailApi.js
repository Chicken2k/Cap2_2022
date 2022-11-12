import { message } from "antd";
import axiosClient from "./axiosClient";

class SendemailApi {
    sendemail = (params) => {
        const url = '/sendemail';
        return axiosClient.post(url, params)
    }
}
const sendemailApi = new SendemailApi();
export default sendemailApi;