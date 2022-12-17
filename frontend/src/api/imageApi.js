import axiosClient from "./axiosClient";

class ImageApi {
    getAll = (id) => {
        const url = `/v1/image/${id}`;
        return axiosClient.get(url);
    };
}
const imageApi = new ImageApi();
export default imageApi;