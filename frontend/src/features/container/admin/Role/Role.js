import { Spin, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userroleData } from '../header/userroleSlice';
import { roleData, updaterole } from './roleSlice';
function Role() {

    const columns = [
        {
            title: 'quyền',
            dataIndex: 'name',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },

        {
            title: 'Số lượng',
            dataIndex: 'amount',
        },
    ];
    const roles = useSelector(state => state.roles.role.data);
    const loading = useSelector(state => state.roles.loading)
    const dispatch = useDispatch();

    const actionResult = async () => { await dispatch(roleData()) }
    const actionUserrole = async () => { await dispatch(userroleData()) }
    useEffect(() => {
        actionUserrole()
    }, [])
    const userrole = useSelector(state => state.userroles.userrole.data);

    const countRole = (id) => {
        var admin = [];
        var quanlytour = [];
        var nguoidung = [];
        for (let i = 0; i < userrole.length; i++) {
            if (userrole[i].roleId === 1) {
                admin.push(userrole[i]);
            }
            if (userrole[i].roleId === 2) {
                quanlytour.push(userrole[i]);
            }
            if (userrole[i].roleId === 3) {
                nguoidung.push(userrole[i]);
            }
        }
        switch (id) {
            case 1:
                return admin.length;
                break;
            case 2:
                return quanlytour.length;
                break;
            case 3:
                return nguoidung.length;
                break;
        }

    }
    const handleStatus = (e, id) => {
        if (e === 1) {
            dispatch(updaterole({ status: 0, idsua: id }))
        } else {
            dispatch(updaterole({ status: 1, idsua: id }))
        }
        setTimeout(() => {
            actionResult();
        }, 500);
    }

    return (
        <div id="admin">
            <div className="heading">
                <h4>Phân quyền</h4>
                <div className="hr"></div>
            </div>
            <div className="content">

                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                    <Table columns={columns} dataSource={roles.map((ok, index) => (
                        {
                            key: index + 1,
                            name: <span>{ok.name}</span>,
                            status: <div className="action">{ok.status === 1 ? <span onClick={() => { handleStatus(ok.status, ok.id) }}><i className="far fa-thumbs-up text-primary"></i></span> : <span onClick={() => handleStatus(ok.status, ok.id)}><i className="far fa-thumbs-down "></i></span>}</div>,
                            amount: <span><b>{userrole ? countRole(ok.id) : ""}</b></span>
                        }))}
                    />
                }
            </div>
        </div>
    )
}

Role.propTypes = {

}

export default Role