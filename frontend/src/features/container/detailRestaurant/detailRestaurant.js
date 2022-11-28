import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Carousel } from "antd";

import './detailRestaurant.css'
import Footer from "../trangchu/footer/Footer";
import restaurantApi from "../../../api/restaurantApi";

export default function DetailRestaurant() {
    const location = useLocation();
    const [ restaurant, setRestaurant ] = useState({});
    useEffect(() => {
        console.log('state: ', location.state.id);
        const getRestaurant = async () => {
            const data = await restaurantApi.getRestaurantById(location.state.id);
            setRestaurant(data.data);
        }
        getRestaurant();
    }, [location]);
    return (
        <div>
            <div className="containerCarousel">
                <Carousel autoplay className="carousel">
                    <div>
                        <div className='image-container'>
                            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg" alt="restaurant" width="500" height="600" />
                        </div>
                    </div>
                    <div>
                        <div className='image-container'>
                            <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="restaurant" width="500" height="600" />
                        </div>
                    </div>
                    <div>
                        <div className='image-container'>
                            <img src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="restaurant" width="500" height="600" />
                        </div>
                    </div>
                    <div>
                        <div className='image-container'>
                            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="restaurant" width="500" height="600" />
                        </div>
                    </div>
                </Carousel>
                <div className='restaurant-information'>
                    <h3 class='box-title'>Thông tin nhà hàng</h3>
                    <div>Name: {restaurant.name}</div>
                    <div>Description: {restaurant.description}</div>
                    <div>Address: {restaurant.address}</div>
                    <div>Số điện thoại liên hệ: {restaurant.phoneNumber}</div>
                </div>
                <div className='restaurant-information'>
                    <h3 class='box-title'>Đánh giá</h3>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
