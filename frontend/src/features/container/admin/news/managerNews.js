import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'antd';

import adminApi from '../../../../api/admin';
import './tintuc.css'

function ManageNews() {
    const [ restaurants, setRestaurants ] = useState([]);
    let listRestaurant;
    const history = useHistory();
    const getRestaurants = async() => {
        const listRestaurant = await adminApi.getAllNews();
        if(listRestaurant) setRestaurants(listRestaurant.data);
    }
    useEffect(() => {
        getRestaurants();
    }, [])
    const switchDetailRestaurantPage = async (restaurantId) => {
        await adminApi.updateNews(restaurantId);
        getRestaurants();
    }
    if (restaurants) {
        listRestaurant = restaurants.map((item) => {
            return (
                <div className='containerItem'>
                    <div className='containerImage'>
                        <img src=''/>
                    </div>
                    <div className='containerContent'>
                        <p>Tiêu đề: {item.name}</p>
                        <p>Nội dung: {item.content}</p>
                        <Button type='primary' onClick={() => switchDetailRestaurantPage(item.id)}>Duyệt</Button>
                        <Button type='primary'>Từ chối</Button>
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

ManageNews.propTypes = {

}

export default ManageNews;
