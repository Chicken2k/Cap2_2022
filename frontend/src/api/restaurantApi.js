import axiosClient from "./axiosClient";
import { message } from "antd";

class RestaurantApi {
  getAll(query) {
    const url = `/v1/restaurants?userId=${query}`;
    return axiosClient.get(url);
  }
  getAllRestaurants() {
    const url = `/v1/restaurants`;
    return axiosClient.get(url);
  }
  getRestaurantById(id) {
    const url = `/v1/restaurants/${id}`;
    return axiosClient.get(url);
  }
  getRestaurantQuery(cityId, foodId) {
    let queryString = "";
    if (cityId | foodId) {
      queryString = queryString + "?";
      if (cityId && foodId) queryString += `cityId=${cityId}&foodId=${foodId}`;
      else if (cityId) queryString += `cityId=${cityId}`;
      else if (foodId) queryString += `foodId=${foodId}`;
    }
    return axiosClient.get(`v1/restaurants/${queryString}`);
  }
  createRestaurant(body) {
    const url = "/v1/restaurants";
    return axiosClient.post(url, body, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((data) => {
      message.success("Tạo nhà hàng thành công, hãy chờ admin xét duyệt");
    });
  }
  updateRestaurant(id, body) {
    const url = `/v1/restaurants/${id}`;
    return axiosClient.patch(url, body);
  }
  deleteRestaurant(id) {
    const url = `/v1/restaurants/${id}`;
    return axiosClient.delete(url);
  }
}

const restaurantApi = new RestaurantApi();
export default restaurantApi;
