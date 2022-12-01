import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Carousel, Layout, Button, Modal } from "antd";
import { useDispatch } from "react-redux";

import './detailRestaurant.css'
import Footer from "../trangchu/footer/Footer";
import restaurantApi from "../../../api/restaurantApi";
import { updateRestaurant, deleteRestaurant, restaurantData } from '../manageRestaurant/restaurantSlice';

export default function DetailRestaurant() {
    const location = useLocation();
    const [ restaurant, setRestaurant ] = useState({});
    const { Sider, Content } = Layout;
    const [ isModalVisibleDelete, setIsModalVisibleDelete ] = useState(false);
    const [ isModalVisibleUpdate, setIsModalVisibleUpdate ] = useState(false);
    const [ restaurantId, setRestaurantId ] = useState(0);
    const [ userRole, setUserRole ] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(restaurantData())};
    const [ restaurantInfor, setRestaurantInfor ] = useState({
        name: '',
        description: '',
        address: '',
        phoneNumber: '',
    });
    const { name, description, address, phoneNumber } = restaurantInfor;
    const getRestaurant = async () => {
        const restaurantItem = await restaurantApi.getRestaurantById(location.state.id);
        setRestaurant(restaurantItem.data);
    }
    useEffect(() => {
        getRestaurant();
        const userRole = localStorage.getItem('role');
        setUserRole(userRole);
        console.log('user role : ', userRole);
    }, [location]);
    const openModalDelete = (restaurantId) => {
        setRestaurantId(restaurantId);
        setIsModalVisibleDelete(true);
    }
    const handleCancelDelete = () => {
        setIsModalVisibleDelete(false);
    }
    const onOkDelete = async() => {
        await restaurantApi.deleteRestaurant(restaurantId);
        actionResult();
        setIsModalVisibleDelete(false);
        history.push('/restaurant-information');
    }
    const openModalUpdate = (restaurantId) => {
        setRestaurantId(restaurantId);
        setIsModalVisibleUpdate(true);
    }
    const handleCancelUpdate = () => {
        setIsModalVisibleUpdate(false);
    }

    const onOkUpdate = async () => {
        let restaurantBody = {}
        if (restaurantInfor.name !== '') {
            restaurantBody.name = restaurantInfor.name;
        }
        if (restaurantInfor.address !== '') {
            restaurantBody.address = restaurantInfor.address;
        }
        if (restaurantInfor.description !== '') {
            restaurantBody.description = restaurantInfor.description;
        }
        if (restaurantInfor.phoneNumber !== '') {
            restaurantBody.phoneNumber = restaurantInfor.phoneNumber;
        }
        await restaurantApi.updateRestaurant(restaurantId, restaurantBody);
        actionResult();
        getRestaurant();
        setIsModalVisibleUpdate(false);
    }
    const onChange = (e) => {
        setRestaurantInfor({
            ...restaurantInfor,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <Layout>
                <Content className="containerCarousel">
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
                </Content>
                <Sider className='actionUser'>
                    {userRole === 'restaurant' ? (
                        <div>
                            <Button type='primary' className='btn-restaurant' onClick={() => openModalDelete(restaurant.id)}>Đóng cửa</Button>
                            <Button type='primary' className='btn-restaurant' onClick={() => openModalUpdate(restaurant.id)}>Sửa</Button>
                        </div>
                    ) : (
                        <Button>Đặt bàn</Button>
                    )
                }
                </Sider>
            </Layout>
                <Modal title="Bạn có muốn đóng cửa nhà hàng này?" visible={isModalVisibleDelete} onCancel={handleCancelDelete} onOk={() => onOkDelete(restaurant.id)}>               
                </Modal>
                <Modal title="Sửa thông tin nhà hàng" visible={isModalVisibleUpdate} onCancel={handleCancelUpdate} onOk={() => onOkUpdate(restaurant.id)}>
                                <form>
                                    <div>
                                        <label className='labelInput'>
                                            Tên nhà hàng
                                        </label>
                                            <input type="text" name="name" value={name} placeholder={name} onChange={onChange}/>
                                    </div>
                                    <div>
                                        <label className='labelInput'>
                                            Mô tả
                                        </label>
                                            <textarea name="description" value={description} placeholder={description} onChange={onChange} rows='10' cols='50'/>
                                    </div>
                                    <div>
                                        <label className='labelInput'>
                                            Địa chỉ
                                        </label>
                                            <input type="text" name="address" value={address} placeholder={address}  onChange={onChange}/>
                                    </div>
                                    <div>
                                        <label className='labelInput'>
                                            Số điện thoại
                                        </label>
                                            <input type="text" name="phoneNumber" value={phoneNumber} placeholder={phoneNumber}  onChange={onChange}/>
                                    </div>
                                </form>                
                </Modal>
            <Footer></Footer>
        </div>
    )
}
