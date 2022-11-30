import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'antd';

import adminApi from '../../../../api/admin';
import './tintuc.css'

function ManageRestaurantRoleAdmin() {
    const [ restaurants, setRestaurants ] = useState([]);
    const getRestaurants = async() => {
        const listRestaurant = await adminApi.getAll();
        if(listRestaurant) setRestaurants(listRestaurant.data);
    }
    useEffect(() => {
        getRestaurants();
    }, [])
    let listRestaurant;
    if (restaurants) {
        listRestaurant = restaurants.map((item) => {
            return (
                <div className='containerItem'>
                    <div className='containerImage'>
                        <img src=''/>
                    </div>
                    <div className='containerContent'>
                        <p>Name: {item.name}</p>
                        <p>Address: {item.address}</p>
                        <p>Số điện thoại: {item.phoneNumber}</p>
                        <Button type='primary'>Xem chi tiết</Button>
                    </div>
                </div>
            )
        });
    };
    return (
        <div>
            {restaurants === 0 ? 
                (
                    <div>Danh sách trống</div>
                ) :
                (
                    <div>
                        {listRestaurant}
                    </div>
                )
        }
        </div>
    )
}

ManageRestaurantRoleAdmin.propTypes = {

}

export default ManageRestaurantRoleAdmin;
