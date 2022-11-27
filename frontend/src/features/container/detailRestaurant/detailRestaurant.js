import React, { useLocation } from "react";
import { Carousel } from "antd";


import './detailRestaurant.css'
import Footer from "../trangchu/footer/Footer";

export default function DetailRestaurant() {
    // const state = useLocation();
    // const { id } = state;
    // console.log('id nè: ', id);
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
                    <div>Name: </div>
                    <div>Description: </div>
                    <div>Address: </div>
                    <div>Số điện thoại liên hệ</div>
                </div>
                <div className='restaurant-information'>
                    <h3 class='box-title'>Đánh giá</h3>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
