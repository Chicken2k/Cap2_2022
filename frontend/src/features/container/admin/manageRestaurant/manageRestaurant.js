import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import './tintuc.css'

function ManageRestaurantRoleAdmin() {
    const [ restaurants, setRestaurants ] = useState([]);

    return (
        <div>
            <p>Xin chao</p>
        </div>
    )
}

ManageRestaurantRoleAdmin.propTypes = {

}

export default ManageRestaurantRoleAdmin;
