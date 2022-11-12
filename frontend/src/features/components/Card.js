import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Card(props) {
    const getCard = props.card
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth - 300;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth + 200;
        })
    })
    return (
        <section className="product">
            <button className="pre-btn"><i className="fas fa-angle-double-right" aria-hidden="true"></i></button>
            <button className="nxt-btn"><i className="fas fa-angle-double-right" aria-hidden="true"></i></button>
            <div className="product-container">

                {getCard.map((items) =>
                    <div className="product-card">
                        <Link to={`/tour/${items.id}`}>
                            <div className="product-image">
                                <img src={items.avatar} />
                            </div>
                            <div className="product-info">
                                <h6 className="product-brand">{items.name}</h6>
                                <span className="price">{items.gianguoilon}</span>
                            </div>
                        </Link>

                    </div>
                )
                }
            </div>
        </section>


    )
}

export default Card