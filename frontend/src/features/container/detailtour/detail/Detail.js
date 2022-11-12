import React from 'react'
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import 'antd/dist/antd.css';
import Chitiettour from '../chitiettour/Chitiettour';
import Danhgia from '../danhgia/Danhgia';

import "./detail.css"
function Detail(props) {
    const { TabPane } = Tabs;
    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );
    return (
        <div className="mb-5 ">
            <StickyContainer>
                <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                    <TabPane tab="Chi tiết tour" key="1" >
                        <Chitiettour id={props.id} />
                    </TabPane>
                    <TabPane tab="Đánh giá khách hàng" key="6">
                        <Danhgia id={props.id} />
                    </TabPane>
                </Tabs>
            </StickyContainer>
        </div>
    )
}

Detail.propTypes = {

}

export default Detail
