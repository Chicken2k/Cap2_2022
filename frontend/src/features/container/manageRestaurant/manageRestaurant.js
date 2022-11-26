import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Image, Modal, Popconfirm, Spin, Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux';

import Footer from '../trangchu/footer/Footer'
import './manageRestaurant.css'
import "./checkactive.js";
import restaurantApi from '../../../api/restaurantApi';
import { createRestaurant, updateRestaurant, deleteRestaurant, restaurantData } from './restaurantSlice';

export default function Listtour() {
    const [ listRestaurant, setRestaurant ] = useState([]);
    const [ restaurantInfor, setRestaurantInfor ] = useState({
        name: '',
        description: '',
        address: '', 
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurants.data);
    const actionResult = async () => { await dispatch(restaurantData())};
    const { name, description, address } = restaurantInfor;
    useEffect(() => {
        actionResult();
    }, []);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const openModal = () => {
        setIsModalVisible(true);
    }
    const submitForm = () => {

    }
    const onChange = (e) => {
        console.log('hee hee: ', e.event);
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
                {restaurants === undefined ? (
                    <div>
                        <p className='message'>Bạn chưa có nhà hàng nào</p>
                        <button onClick={openModal}>Thêm nhà hàng</button>
                        <Modal title="Thêm nhà hàng" visible={isModalVisible} onCancel={handleCancel} onOk={submitForm}>
                            <form>
                                <div>
                                    <label>
                                        Tên nhà hàng
                                    </label>
                                        <input type="text" name="name" value={name} onChange={onChange}/>
                                </div>
                                <div>
                                    <label>
                                        Mô tả
                                        <input type="text" name="name" value={description} onChange={onChange}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Địa chỉ
                                        <input type="text" name="name" value={address} onChange={onChange}/>
                                    </label>
                                </div>
                            </form>                
                        </Modal>
                    </div>
                ) : (
                    <div>Nhà hàng của bạn nè</div> 
                )}
                
            </div>
            <Footer />
        </div>
    )
}
