
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from '@material-ui/core';
import { Popconfirm, Popover, Spin, Table, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { chudeData, removechude, updateChude } from './chudeSlice';
function Chude() {

    const columns = [
        {
            title: 'Tên chủ đề',
            dataIndex: 'chude',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];
    const hangdleDelete = e => {
        dispatch(removechude(e));
        setTimeout(() => {
            actionResult();
        }, 500);
    }
    const history = useHistory()
    const match = useRouteMatch();
    const hangdleEdit = (id) => {
        history.replace(`${match.url}/suachude/${id}`)
    }
    const chudes = useSelector(state => state.chudes.chude.data);
    const loading = useSelector(state => state.chudes.loading)
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(chudeData()) }

    return (
        <div id="admin">
            <div className="heading">
                <h4>Quản lý chủ đề comments </h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to={`${match.url}/themchude`}><Button variant="outlined" color="secondary"><i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới</Button></Link>
                </div>
                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                    <Table columns={columns} dataSource={chudes.map((ok, index) => (
                        {
                            key: index + 1,
                            chude: <span>{ok.chuDe}</span>,
                            action:
                                <div className="action">
                                    <Popconfirm title="Bạn có muốn sửa？" onConfirm={() => { hangdleEdit(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                                        <i className="far fa-edit mr-4"></i>
                                    </Popconfirm>
                                    <Popconfirm title="Bạn có muốn xoá？" onConfirm={() => { hangdleDelete(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                        <i className="far fa-trash-alt" ></i>
                                    </Popconfirm>
                                </div>
                        }))}
                    />
                }
            </div>
        </div>
    )
}


export default Chude