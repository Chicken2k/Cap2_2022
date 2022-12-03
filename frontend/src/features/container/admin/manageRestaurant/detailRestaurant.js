import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'antd';

import adminApi from '../../../../api/admin';
export const DetailRestaurant = () => {
    const location = useLocation();
    const history = useHistory();
    const [ restaurant, setRestaurant ] = useState({});
    const getRestaurant = async() => {
        let restaurantItem;
        if(location.state.id) {
            restaurantItem = await adminApi.getRestaurantById(location.state.id);
        };
        setRestaurant(restaurantItem.data);
    }
    useEffect(() => {
        getRestaurant();
    }, [location]);
    const approveRestaurant = async(restaurantId) => {
        const body = {
            status: true,
        }
        await adminApi.updateRestaurant(restaurantId, body);
        history.push('/admin/manage-restaurant');
    };
    return (
        <div>
            <p>Name: {restaurant.name}</p>
            <p>Description: {restaurant.description}</p>
            <p>Address: {restaurant.address}</p>
            <p>Phone number: {restaurant.phoneNumber}</p>
            <Button type='primary' onClick={() => approveRestaurant(restaurant.id)}>Chấp nhận</Button>
        </div>
    )
}