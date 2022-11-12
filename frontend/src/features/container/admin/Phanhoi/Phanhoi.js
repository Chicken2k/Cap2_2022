
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from '@material-ui/core';
import { Popconfirm, Popover, Spin, Table, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { phanhoiData, removephanhoi, updatephanhoi } from './phanhoiSlice';
function Phanhoi() {

    const columns = [
        {
            title: 'Loại phân tích phản hồi',
            dataIndex: 'analyzeComment',
        },
        {
            title: 'Câu trả lời cho phản hồi',
            dataIndex: 'responseComment',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];
    const hangdleDelete = e => {
        dispatch(removephanhoi(e));
        setTimeout(() => {
            actionResult();
        }, 500);
    }
    const history = useHistory()
    const match = useRouteMatch();
    const hangdleEdit = (id) => {
        history.replace(`${match.url}/suaphanhoi/${id}`)
    }
    const phanhois = useSelector(state => state.phanhois.phanhoi.data);
    const loading = useSelector(state => state.phanhois.loading)
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(phanhoiData()) }

    return (
        <div id="admin">
            <div className="heading">
                <h4>Quản lý phản hồi comments </h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                    <Table columns={columns} dataSource={phanhois.map((ok, index) => (
                        {
                            key: index + 1,
                            analyzeComment: <span>{ok.analyzeComment}</span>,
                            responseComment: <span>{ok.responseComment}</span>,
                            action:
                                <div className="action">
                                    <Popconfirm title="Bạn có muốn sửa？" onConfirm={() => { hangdleEdit(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                                        <i className="far fa-edit mr-4"></i>
                                    </Popconfirm>
                                </div>
                        }))}
                    />
                }
            </div>
        </div>
    )
}


export default Phanhoi