import axios from "axios";
const API_URL = "http://localhost:3001";

const cloudinaryUpload = (fileToUpload) => {
  console.log(fileToUpload);
  return axios
    .post(API_URL + "/v1/upload", fileToUpload, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default cloudinaryUpload;
