import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Col, Row, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Footer from '../trangchu/footer/Footer'
import './manageRestaurant.css'
import "./checkactive.js";
import restaurantApi from '../../../api/restaurantApi';
import { createRestaurant, updateRestaurant, deleteRestaurant, restaurantData } from './restaurantSlice';

export default function Listtour() {
    const [ restaurantInfor, setRestaurantInfor ] = useState({
        name: '',
        description: '',
        address: '',
        phonerNumber: '',
    });
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ isModalVisibleDelete, setIsModalVisibleDelete ] = useState(false);
    const [ isModalVisibleUpdate, setIsModalVisibleUpdate ] = useState(false);
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurants.restaurants.data);
    const actionResult = async () => { await dispatch(restaurantData())};
    const { name, description, address, phoneNumber } = restaurantInfor;
    useEffect(() => {
        actionResult();     
    }, []);
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const openModal = () => {
        setIsModalVisible(true);
    }
    const onSubmit =async () => {
        const userId = localStorage.getItem('userId');
        const restaurantBody = {
            name: restaurantInfor.name,
            phoneNumber: restaurantInfor.phoneNumber,
            description: restaurantInfor.description,
            address: restaurantInfor.address,
            userId: userId,
        }
        await restaurantApi.createRestaurant(restaurantBody);
        //dispatch(createRestaurant(restaurantBody));
        actionResult();
    }
    const onOk = () => {
        onSubmit();
        setIsModalVisible(false);
    }
    const onChange = (e) => {
        setRestaurantInfor({
            ...restaurantInfor,
            [e.target.name]: e.target.value
        })
    }

    const openModalDelete = () => {
        setIsModalVisibleDelete(true);
    }
    const handleCancelDelete = () => {
        setIsModalVisibleDelete(false);
    }
    const onOkDelete = async(restaurantId) => {
        await restaurantApi.deleteRestaurant(restaurantId);
        actionResult();
        setIsModalVisibleDelete(false);
    }

    const openModalUpdate = () => {
        setIsModalVisibleUpdate(true);
    }
    const handleCancelUpdate = () => {
        setIsModalVisibleUpdate(false);
    }

    const onOkUpdate = async (restaurantId) => {
        const restaurantBody = {
            name: restaurantInfor.name,
            phoneNumber: restaurantInfor.phonerNumber,
            description: restaurantInfor.description,
            address: restaurantInfor.address,
        }
        await restaurantApi.updateRestaurant(restaurantId, restaurantBody);
        actionResult();
        setIsModalVisibleUpdate(false);
    }

    let listRestaurant;
    if (restaurants) {
        listRestaurant = restaurants.map((restaurant) => {
            return (
                <li className='restaurantItem' key={restaurant.id}>
                    <Row>
                        <Col span={18} push={6}>
                            <p>Tên nhà hàng: {restaurant.name}</p>
                            <p>{restaurant.description}</p>
                            <p>Địa chỉ: {restaurant.address}</p>
                            <p>Số điện thoại đặt bàn: {restaurant.phoneNumber}</p>
                            <Button type='primary' onClick={openModalDelete}>Xóa</Button>
                            <Button type='primary' onClick={openModalUpdate}>Sửa</Button>

                            <Modal title="Bạn có muốn xóa nhà hàng này?" visible={isModalVisibleDelete} onCancel={handleCancelDelete} onOk={() => onOkDelete(restaurant.id)}>
                            <form onSubmit={onSubmit}>
                            </form>                
                            </Modal>

                            
                        <Modal title="Sửa thông tin nhà hàng" visible={isModalVisibleUpdate} onCancel={handleCancelUpdate} onOk={() => {onOkUpdate(restaurant.id)}}>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <label className='labelInput'>
                                        Tên nhà hàng
                                    </label>
                                        <input type="text" name="name" value={name}  onChange={onChange}/>
                                </div>
                                <div>
                                    <label className='labelInput'>
                                        Mô tả
                                    </label>
                                        <textarea name="description" value={description} onChange={onChange} rows='10' cols='50'/>
                                </div>
                                <div>
                                    <label className='labelInput'>
                                        Địa chỉ
                                    </label>
                                        <input type="text" name="address" value={address}  onChange={onChange}/>
                                </div>
                                <div>
                                    <label className='labelInput'>
                                        Số điện thoại
                                    </label>
                                        <input type="text" name="phoneNumber" value={phoneNumber}  onChange={onChange}/>
                                </div>
                            </form>                
                        </Modal>
                            
                        </Col>
                        <Col span={6} pull={18}>
                            <Image src=''/>
                        </Col>
                    </Row>
                </li>
            );
        })
    }
    return (
        <div id="list-tour">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/list-tour" disabled>Thông tin nhà hàng</Link></li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                <Modal title="Thêm nhà hàng" visible={isModalVisible} onCancel={handleCancel} onOk={onOk}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className='labelInput'>
                                Tên nhà hàng
                            </label>
                                <input type="text" name="name" value={name}  onChange={onChange}/>
                        </div>
                        <div>
                            <label className='labelInput'>
                                Mô tả
                            </label>
                                <textarea name="description" value={description} onChange={onChange} rows='10' cols='50'/>
                        </div>
                        <div>
                            <label className='labelInput'>
                                Địa chỉ
                            </label>
                                <input type="text" name="address" value={address}  onChange={onChange}/>
                        </div>
                        <div>
                            <label className='labelInput'>
                                Số điện thoại
                            </label>
                                <input type="text" name="phoneNumber" value={phoneNumber}  onChange={onChange}/>
                        </div>
                    </form>                
                </Modal>
                {restaurants === 0 ? (
                    <div>
                        <div className='noRestaurant'>
                            <p className='message'>Bạn chưa có nhà hàng nào</p>
                            <Button type='primary' onClick={openModal}>Thêm nhà hàng</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Button type='primary' onClick={openModal}>Thêm nhà hàng</Button>
                        <div>Danh sách nhà hàng của bạn</div>
                        <ul>{listRestaurant}</ul>
                    </div>
                )}
                
            </div>
            <Footer />
        </div>
    )
}
